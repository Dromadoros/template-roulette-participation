import { NextRequest, NextResponse } from 'next/server';
import { saveGamePlay } from '@/lib/dynamodb';

export async function POST(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { 
        error: 'Failed to record game play',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}