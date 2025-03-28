import { NextFunction, Request, Response } from 'express';

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).send({
    message: '404 Not found',
  });
}
