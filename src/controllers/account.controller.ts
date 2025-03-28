import { NextFunction, Request, Response } from 'express';

import accountService from '../services/account.service';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { serializeAccount } from '../serializers/account.serializer';
import RequestWithAccount from '../types/express/request';
import AppError from '../interfaces/app-error.interface';
import { formatCents } from '../utils/format-cents';

async function createAccount(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateAccountDto;
  try {
    const account = await accountService.createAccount(body);
    res.status(201).send(serializeAccount(account));
  } catch (error) {
    next(error);
  }
}

async function getBalance(
  req: RequestWithAccount,
  res: Response,
  next: NextFunction
) {
  const account = req.account;
  try {
    if (!account || !account.id) throw new AppError(401, 'Unauthenticated');
    const balance = await accountService.getBalance(account.id);
    res.status(200).send({ balance: formatCents(balance) });
  } catch (error) {
    next(error);
  }
}

export default {
  createAccount,
  getBalance,
};
