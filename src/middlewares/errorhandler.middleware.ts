import { NextFunction, Request, Response } from 'express';
import AppError from '../interfaces/app-error.interface';

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
  });
}

export default errorHandler;
