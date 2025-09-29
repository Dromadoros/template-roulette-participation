import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Import DynamoDB here to test the connection
    const { DynamoDBClient, ListTablesCommand } = await import('@aws-sdk/client-dynamodb');
    
    // Test different credential configurations
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      region: process.env.REGION,
      hasCredentials: !!(process.env.DYNAMO_ACCESS_KEY_ID && process.env.DYNAMO_SECRET_ACCESS_KEY),
    };

    // Try to create a client and test connection
    try {
      const client = new DynamoDBClient({
        region: process.env.REGION || 'eu-central-1',
        credentials: process.env.DYNAMO_ACCESS_KEY_ID && process.env.DYNAMO_SECRET_ACCESS_KEY ? {
          accessKeyId: process.env.DYNAMO_ACCESS_KEY_ID,
          secretAccessKey: process.env.DYNAMO_SECRET_ACCESS_KEY,
        } : undefined,
      });

      // Try to list tables (simple operation to test credentials)
      const command = new ListTablesCommand({});
      const result = await client.send(command);
      
      debugInfo.connectionTest = 'SUCCESS';
      debugInfo.tablesFound = result.TableNames?.length || 0;
      debugInfo.tables = result.TableNames;

    } catch (connectionError) {
      debugInfo.connectionTest = 'FAILED';
      debugInfo.connectionError = connectionError instanceof Error ? connectionError.message : String(connectionError);
      debugInfo.errorName = connectionError instanceof Error ? connectionError.name : 'UnknownError';
    }

    return NextResponse.json({
      success: true,
      debug: debugInfo,
      message: 'DynamoDB connection test completed'
    });

  } catch (error) {
    console.error('Error in DynamoDB test endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test DynamoDB connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}