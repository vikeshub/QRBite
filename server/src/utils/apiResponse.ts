import { Response } from 'express';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success request',
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  error: string,
  message: string = 'Error',
  statusCode: number = 400
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Resource created successfully'
) => {
  return sendSuccess(res, data, message, 201);
};

export const noContentResponse = (res: Response) => {
  return res.status(204).send();

};