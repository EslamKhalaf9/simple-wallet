import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import authService from '../services/auth.service';

async function login(req: Request, res: Response, next: NextFunction) {
  const body = req.body as LoginDto;
  try {
    const token = await authService.login(body);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
}

export default { login };
