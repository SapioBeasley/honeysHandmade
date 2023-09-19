import { SuccessResponse } from '@/types/responses';
import { NextResponse } from 'next/server';

export const handleApiSuccess = <T>(
  message: string,
  payload: T,
  statusCode: number = 200
) => {
  return NextResponse.json<SuccessResponse<T>>(
    {
      success: true,
      message,
      ...payload,
    },
    {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
