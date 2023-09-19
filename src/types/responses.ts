type BaseResponse = {
  success: boolean;
  message: string;
};

export type ErrorResponse = BaseResponse & { errors: unknown[] };

export type SuccessResponse<T> = T & BaseResponse;
