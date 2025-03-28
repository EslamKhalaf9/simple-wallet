jest.mock('../../src/db/prisma', () => ({
  transaction: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

import prisma from '../../src/db/prisma';
import transactionService from '../../src/services/transaction.service';

describe('transactionService', () => {
  describe('getTransactions', () => {
    it('should return transactions', async () => {
      const accountId = '1';
      const page = 1;
      const limit = 10;
      const transactions = [
        { id: '1', amount: 100, type: 'deposit', createdAt: new Date() },
        { id: '2', amount: 200, type: 'withdraw', createdAt: new Date() },
      ];

      (prisma.transaction.findMany as jest.Mock).mockResolvedValue(
        transactions
      );

      const result = await transactionService.getTransactions(
        accountId,
        page,
        limit
      );

      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { accountId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      expect(result).toEqual(transactions);
    });

    it('should return an empty array if no transactions found', async () => {
      const accountId = '1';
      const page = 1;
      const limit = 10;

      (prisma.transaction.findMany as jest.Mock).mockResolvedValue([]);

      const result = await transactionService.getTransactions(
        accountId,
        page,
        limit
      );

      expect(prisma.transaction.findMany).toHaveBeenCalledWith({
        where: { accountId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      expect(result).toEqual([]);
    });
  });

  describe('createTransaction', () => {
    it('should create a transaction', async () => {
      const accountId = '1';
      const amount = 100;
      const type = 'deposit';

      (prisma.transaction.create as jest.Mock).mockResolvedValue({ id: '1' });

      const transactionId = await transactionService.createTransaction(
        accountId,
        amount,
        type
      );

      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: { accountId, amount, type },
      });

      expect(transactionId).toBe('1');
    });
  });
});
