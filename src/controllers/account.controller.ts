import { Request, Response } from 'express';

import accountService from '../services/account.service';

async function createAccount(req: Request, res: Response) {
  const account = await accountService.createAccount();
  res.status(201).send(account);
}

export default {
  createAccount,
};
