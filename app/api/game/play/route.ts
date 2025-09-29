import { NextRequest, NextResponse } from 'next/server';
import { saveGamePlay } from '@/lib/dynamodb';

export async function POST(request: NextRequest) {
  try {
    // Debug: Log environment variables
    console.log('Environment debug:', {
      NODE_ENV: process.env.NODE_ENV,
      REGION: process.env.REGION,
      DYNAMODB_GAME_DATA_TABLE: process.env.DYNAMODB_GAME_DATA_TABLE,
      DYNAMODB_GAME_SESSIONS_TABLE: process.env.DYNAMODB_GAME_SESSIONS_TABLE,
      // Log if any AWS-related env vars are present (but don't log the values for security)
      hasAWSVars: Object.keys(process.env).filter(key => key.startsWith('AWS_')).length > 0,
    });

    const body = await request.json();
    const { result, sessionId } = body;

    // Validate required fields
    if (!result || !['win', 'lose'].includes(result)) {
      return NextResponse.json(
        { error: 'Invalid game result. Must be "win" or "lose"' },
        { status: 400 }
      );
    }

    // Get client information for tracking
    const playerIp = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Save game play to DynamoDB
    const gameId = await saveGamePlay({
      result,
      sessionId,
      playerIp,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      gameId,
      message: 'Game play recorded successfully',
    });

  } catch (error) {
    console.error('Error recording game play:', error);
    return NextResponse.json(
      { 
        error: 'Failed to record game play',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}