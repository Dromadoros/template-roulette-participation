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
      address,
      postalCode,
      phoneNumber,
      sessionId 
    } = body;

    // Validate required fields
    if (!gameId) {
      return NextResponse.json(
        { error: 'Game ID is required' },
        { status: 400 }
      );
    }

    if (!childFirstName || !childLastName || !parentEmail || !address || !postalCode || !phoneNumber) {
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

    // French postal code validation (5 digits)
    const postalCodeRegex = /^[0-9]{5}$/;
    if (!postalCodeRegex.test(postalCode)) {
      return NextResponse.json(
        { error: 'Invalid French postal code format' },
        { status: 400 }
      );
    }

    // French phone number validation
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid French phone number format' },
        { status: 400 }
      );
    }

    // Save prize claim form to DynamoDB
    const submissionId = await savePrizeClaimForm({
      gameId,
      childFirstName: childFirstName.trim(),
      childLastName: childLastName.trim(),
      parentEmail: parentEmail.trim().toLowerCase(),
      address: address.trim(),
      postalCode: postalCode.trim(),
      phoneNumber: phoneNumber.trim(),
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