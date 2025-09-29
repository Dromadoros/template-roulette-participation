import { NextRequest, NextResponse } from 'next/server';
import { savePrizeClaimForm } from '@/lib/dynamodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      gameId, 
      childFirstName, 
      childLastName, 
      parentEmail, 
      sessionId 
    } = body;

    // Validate required fields
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    if (!childFirstName || !childLastName || !parentEmail) {
      return NextResponse.json(
        { error: 'All form fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(parentEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save prize claim form to DynamoDB
    const submissionId = await savePrizeClaimForm({
      gameId,
      childFirstName: childFirstName.trim(),
      childLastName: childLastName.trim(),
      parentEmail: parentEmail.trim().toLowerCase(),
      sessionId,
    });

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Prize claim form submitted successfully',
    });

  } catch (error) {
    console.error('Error submitting prize claim form:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit prize claim form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}