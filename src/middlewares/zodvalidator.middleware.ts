// utils/zodValidator.ts
import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import AppError from '../interfaces/app-error.interface';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(400, result.error.message);
    }
    req.body = result.data;
    next();
  };
};
