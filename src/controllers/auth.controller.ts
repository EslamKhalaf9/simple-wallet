import { NextFunction, Request, Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import authService from '../services/auth.service';
import AppError from '../interfaces/app-error.interface';
import RequestWithAccount from '../types/express/request';

async function login(req: Request, res: Response, next: NextFunction) {
  const body = req.body as LoginDto;
  try {
    const token = await authService.login(body);
    res.status(201).send({ token });
  } catch (error) {
    next(error);
  }
}

async function me(req: RequestWithAccount, res: Response, next: NextFunction) {
  try {
    if (!true) {
      throw new AppError(401, 'Unauthenticated');
    }
    res.status(200).send(req.account);
  } catch (error) {
    next(error);
  }
}

export default { login, me };
