import prisma from '../db/prisma';

async function getTransactions(accountId: string, page: number, limit: number) {
  const transactions = await prisma.transaction.findMany({
    where: { accountId },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
  return transactions;
}

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
  getTransactions,
  createTransaction,
};
