import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

// Initialize DynamoDB client
console.log('DynamoDB Client Debug - Full Environment:', {
  region: process.env.REGION,
  nodeEnv: process.env.NODE_ENV,
  allEnvKeys: Object.keys(process.env).filter(key => 
    key.includes('DYNAMO') || key.includes('ACCESS') || key.includes('SECRET') || key.includes('AWS')
  ),
  hasAccessKey: !!process.env.DYNAMO_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.DYNAMO_SECRET_ACCESS_KEY,
  accessKeyValue: process.env.DYNAMO_ACCESS_KEY_ID ? `${process.env.DYNAMO_ACCESS_KEY_ID.substring(0, 8)}...` : 'undefined',
  secretKeyValue: process.env.DYNAMO_SECRET_ACCESS_KEY ? `${process.env.DYNAMO_SECRET_ACCESS_KEY.substring(0, 8)}...` : 'undefined',
});

// Try to create credentials object manually and test it
let credentials;
if (process.env.DYNAMO_ACCESS_KEY_ID && process.env.DYNAMO_SECRET_ACCESS_KEY) {
  credentials = {
    accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
    secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY,
  };
  console.log('Created credentials object:', {
    accessKeyId: credentials.accessKeyId ? `${credentials.accessKeyId.substring(0, 8)}...` : 'missing',
    secretAccessKey: credentials.secretAccessKey ? `${credentials.secretAccessKey.substring(0, 8)}...` : 'missing',
  });
} else {
  console.log('Missing credentials, will use default provider chain');
}

const client = new DynamoDBClient({
  region: process.env.REGION || 'eu-central-1',
  credentials,
});

const docClient = DynamoDBDocumentClient.from(client);

// Table names from environment variables
const GAME_DATA_TABLE = process.env.DYNAMODB_GAME_DATA_TABLE;
const GAME_SESSIONS_TABLE = process.env.DYNAMODB_GAME_SESSIONS_TABLE;

// Types for our data structures
export interface GamePlay {
  gameId: string;
  result: 'win' | 'lose';
  timestamp: string;
  sessionId?: string;
  playerIp?: string;
  userAgent?: string;
}

export interface PrizeClaimForm {
  submissionId: string;
  gameId: string;
  childFirstName: string;
  childLastName: string;
  parentEmail: string;
  timestamp: string;
  sessionId?: string;
}

/**
 * Save a game play result to DynamoDB
 */
export async function saveGamePlay(gameData: Omit<GamePlay, 'gameId' | 'timestamp'>): Promise<string> {
  const gameId = uuidv4();
  const timestamp = new Date().toISOString();

  const gamePlay: GamePlay = {
    gameId,
    timestamp,
    ...gameData,
  };

  try {
    // Save to game_data table using single table design
    await docClient.send(new PutCommand({
      TableName: GAME_DATA_TABLE,
      Item: {
        PK: `GAME#${gameId}`,
        SK: `RESULT#${timestamp}`,
        GSI1PK: `RESULT#${gameData.result}`,
        GSI1SK: timestamp,
        ...gamePlay,
        type: 'game_play',
        expires_at: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60), // 90 days TTL
      },
    }));

    console.log('Game play saved successfully:', gameId);
    return gameId;
  } catch (error) {
    console.error('Error saving game play:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to save game play');
  }
}

/**
 * Save prize claim form submission to DynamoDB
 */
export async function savePrizeClaimForm(formData: Omit<PrizeClaimForm, 'submissionId' | 'timestamp'>): Promise<string> {
  const submissionId = uuidv4();
  const timestamp = new Date().toISOString();

  const submission: PrizeClaimForm = {
    submissionId,
    timestamp,
    ...formData,
  };

  try {
    // Save to both tables for different access patterns
    await Promise.all([
      // Save to game_data table
      docClient.send(new PutCommand({
        TableName: GAME_DATA_TABLE,
        Item: {
          PK: `SUBMISSION#${submissionId}`,
          SK: `CLAIM#${timestamp}`,
          GSI1PK: `GAME#${formData.gameId}`,
          GSI1SK: timestamp,
          ...submission,
          type: 'prize_claim',
          expires_at: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year TTL
        },
      })),
      // Save to game_sessions table for easier querying
      docClient.send(new PutCommand({
        TableName: GAME_SESSIONS_TABLE,
        Item: {
          session_id: submissionId,
          user_id: formData.parentEmail,
          created_at: timestamp,
          ...submission,
          expires_at: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year TTL
        },
      })),
    ]);

    console.log('Prize claim form saved successfully:', submissionId);
    return submissionId;
  } catch (error) {
    console.error('Error saving prize claim form:', error);
    throw new Error('Failed to save prize claim form');
  }
}

/**
 * Get game statistics (for admin purposes)
 */
export async function getGameStatistics() {
  try {
    const [wins, losses] = await Promise.all([
      docClient.send(new QueryCommand({
        TableName: GAME_DATA_TABLE,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk',
        ExpressionAttributeValues: {
          ':pk': 'RESULT#win',
        },
      })),
      docClient.send(new QueryCommand({
        TableName: GAME_DATA_TABLE,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :pk',
        ExpressionAttributeValues: {
          ':pk': 'RESULT#lose',
        },
      })),
    ]);

    return {
      totalGames: (wins.Count || 0) + (losses.Count || 0),
      wins: wins.Count || 0,
      losses: losses.Count || 0,
      winRate: wins.Count && losses.Count ? (wins.Count / ((wins.Count || 0) + (losses.Count || 0))) * 100 : 0,
    };
  } catch (error) {
    console.error('Error getting game statistics:', error);
    throw new Error('Failed to get game statistics');
  }
}

/**
 * Get submissions for a specific game (for admin purposes)
 */
export async function getSubmissionsForGame(gameId: string) {
  try {
    const result = await docClient.send(new QueryCommand({
      TableName: GAME_DATA_TABLE,
      IndexName: 'GSI1',
      KeyConditionExpression: 'GSI1PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `GAME#${gameId}`,
      },
    }));

    return result.Items || [];
  } catch (error) {
    console.error('Error getting submissions for game:', error);
    throw new Error('Failed to get submissions for game');
  }
}