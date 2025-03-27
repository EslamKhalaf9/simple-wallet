import { Request, Response } from 'express';

import accountService from '../services/account.service';
import { CreateAccountDto } from '../dtos/create-account.dto';

async function createAccount(req: Request, res: Response) {
  const body = req.body as CreateAccountDto;
  const account = await accountService.createAccount(body);
  res.status(201).send(account);
}

export default {
  createAccount,
};
