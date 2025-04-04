import { NextFunction, Response } from 'express';
import RequestWithAccount from '../types/express/request';
import accountService from '../services/account.service';
import AppError from '../interfaces/app-error.interface';
import transactionService from '../services/transaction.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import prisma from '../db/prisma';

async function getTransactions(
  req: RequestWithAccount,
  res: Response,
  next: NextFunction
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    if (!req.account || !req.account.id)
      throw new AppError(401, 'Not authorized');

    const transactions = await transactionService.getTransactions(
      req.account.id,
      page,
      limit
    );
    res.status(200).send(transactions);
  } catch (error) {
    next(error);
  }
}

async function withdraw(
  req: RequestWithAccount,
  res: Response,
  next: NextFunction
) {
  const { amount } = req.body as CreateTransactionDto;
  try {
    const transactionId = await prisma.$transaction(async () => {
      if (!req.account || !req.account.id) return undefined;

      await accountService.withdraw(req.account.id, amount);
      return transactionService.createTransaction(
        req.account.id,
        amount,
        'withdraw'
      );
    });

    if (!transactionId) {
      throw new AppError(400, 'Transaction failed');
    }
    res.status(201).send({ transactionId });
  } catch (error) {
    next(error);
  }
}

async function deposit(
  req: RequestWithAccount,
  res: Response,
  next: NextFunction
) {
  const { amount } = req.body as CreateTransactionDto;
  try {
    const transactionId = await prisma.$transaction(async () => {
      if (!req.account || !req.account.id) return undefined;

      await accountService.deposit(req.account.id, amount);
      return transactionService.createTransaction(
        req.account.id,
        amount,
        'deposit'
      );
    });
    res.status(201).send({ transactionId });
  } catch (error) {
    next(error);
  }
}

export default {
  getTransactions,
  withdraw,
  deposit,
};
