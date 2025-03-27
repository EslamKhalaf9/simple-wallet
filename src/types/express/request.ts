import { Account } from '@prisma/client';
import { Request } from 'express';

export default interface RequestWithAccount extends Request {
  account?: Partial<Account>;
}
