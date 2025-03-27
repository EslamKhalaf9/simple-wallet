import { Account } from '@prisma/client';
import bcrypt from 'bcrypt';

import prisma from '../db/prisma';
import { CreateAccountDto } from '../dtos/create-account.dto';
import AppError from '../interfaces/app-error.interface';

async function createAccount(account: CreateAccountDto): Promise<Account> {
  account.password = await bcrypt.hash(account.password, 10);

  const existingAccount = await findAccountByEmail(account.email);

  if (existingAccount) {
    throw new AppError(400, 'Account with this email already exists');
  }

  const newAccount = await prisma.account.create({ data: account });

  return newAccount;
}

async function findAccountByEmail(email: string): Promise<Account | null> {
  const account = await prisma.account.findUnique({ where: { email } });

  return account;
}

async function findAccountById(id: string): Promise<Account | null> {
  const account = await prisma.account.findUnique({ where: { id } });

  return account;
}

export default { createAccount, findAccountByEmail, findAccountById };
