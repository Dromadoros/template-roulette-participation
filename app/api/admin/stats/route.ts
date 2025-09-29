import { NextRequest, NextResponse } from 'next/server';
import { getGameStatistics } from '@/lib/dynamodb';

export async function GET(request: NextRequest) {
  try {
    // Basic authentication check (you might want to implement proper auth)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.includes('Bearer admin-secret-key')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const stats = await getGameStatistics();

    return NextResponse.json({
      success: true,
      statistics: stats,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error getting game statistics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get game statistics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}