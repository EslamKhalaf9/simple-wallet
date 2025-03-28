jest.mock('../../src/db/prisma', () => ({
  transaction: {
    create: jest.fn(),
  },
}));

import prisma from '../../src/db/prisma';
import transactionService from '../../src/services/transaction.service';

describe('transactionService', () => {
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
