import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

import AppError from '../interfaces/app-error.interface';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        const field = issue.path.join('.');
        return field ? `${field}: ${issue.message}` : issue.message;
      });

      throw new AppError(400, 'Validation error', errors);
    }

    req.body = result.data;
    next();
  };
};
