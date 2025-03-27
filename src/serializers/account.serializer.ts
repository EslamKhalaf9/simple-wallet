import { Account } from '@prisma/client';

export function serializeAccount(account: Account) {
  const { password, ...rest } = account;
  return rest;
}
