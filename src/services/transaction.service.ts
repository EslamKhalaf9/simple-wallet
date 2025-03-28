import prisma from '../db/prisma';

async function createTransaction(
  accountId: string,
  amount: number,
  type: 'withdraw' | 'deposit'
) {
  const transaction = await prisma.transaction.create({
    data: { amount, accountId, type },
  });

  return transaction.id;
}

export default {
  createTransaction,
};
