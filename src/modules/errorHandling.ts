import { ErrorResponse } from '@/types/responses';
import { NextResponse } from 'next/server';

export const handleApiError = (
  error: unknown,
  statusCode: number = 400
): NextResponse<ErrorResponse> => {
  if (error instanceof Error) {
    return NextResponse.json<ErrorResponse>(
      {
        success: false,
        message: error.message,
        errors: [],
      },
      {
        status: statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.json<ErrorResponse>(
    {
      success: false,
      message: 'Unknown Exception',
      errors: [],
    },
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
