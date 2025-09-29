import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Return environment debug information (safe for debugging)
    const debugInfo = {
      NODE_ENV: process.env.NODE_ENV,
      REGION: process.env.REGION,
      DYNAMODB_GAME_DATA_TABLE: process.env.DYNAMODB_GAME_DATA_TABLE,
      DYNAMODB_GAME_SESSIONS_TABLE: process.env.DYNAMODB_GAME_SESSIONS_TABLE,
      hasAccessKey: !!process.env.DYNAMO_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.DYNAMO_SECRET_ACCESS_KEY,
      accessKeyPreview: process.env.DYNAMO_ACCESS_KEY_ID ? `${process.env.DYNAMO_ACCESS_KEY_ID.substring(0, 8)}...` : 'undefined',
      secretKeyPreview: process.env.DYNAMO_SECRET_ACCESS_KEY ? `${process.env.DYNAMO_SECRET_ACCESS_KEY.substring(0, 8)}...` : 'undefined',
      allEnvKeys: Object.keys(process.env).filter(key => 
        key.includes('DYNAMO') || key.includes('ACCESS') || key.includes('SECRET') || key.includes('AWS') || key.includes('REGION')
      ),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      debug: debugInfo,
      message: 'Environment debug information'
    });

  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get debug info',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}