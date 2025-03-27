import { NextFunction, Request, Response } from 'express';
import AppError from '../interfaces/app-error.interface';

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  const messages =
    err.messages?.length > 0
      ? err.messages
      : [err.message || 'something went wrong'];

  res.status(statusCode).json({
    messages,
  });
}

export default errorHandler;
