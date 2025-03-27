import { NextFunction, Request, Response } from 'express';

import accountService from '../services/account.service';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { serializeAccount } from '../serializers/account.serializer';

async function createAccount(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateAccountDto;
  try {
    const account = await accountService.createAccount(body);
    res.status(201).send(serializeAccount(account));
  } catch (error) {
    next(error);
  }
}

export default {
  createAccount,
};
