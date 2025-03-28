jest.mock('../../src/db/prisma', () => ({
  account: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

import prisma from '../../src/db/prisma';
import accountService from '../../src/services/account.service';

jest.mock('bcrypt');

describe('accountService', () => {
  const accountInput = {
    email: 'user@example.com',
    password: 'aA!12345678',
    firstname: 'John',
    lastname: 'Doe',
    nid: '1234567890123456',
    nid_expire_date: '01/2023',
    government: 'Government',
    city: 'City',
    address: 'Address',
    job: 'Job',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    it('should create an account when email is not taken', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

      (prisma.account.create as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });

      const account = await accountService.createAccount(accountInput);

      expect(account).toEqual({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });
    });

    it('should throw an error when email is taken', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });

      await expect(accountService.createAccount(accountInput)).rejects.toThrow(
        'Account with this email already exists'
      );
    });
  });

  describe('findAccountByEmail', () => {
    it('should find an account by email', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });

      const account = await accountService.findAccountByEmail(
        'user@example.com'
      );

      expect(account).toEqual({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });
    });
  });

  describe('findAccountById', () => {
    it('should find an account by id', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });

      const account = await accountService.findAccountById('123');

      expect(account).toEqual({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 0,
      });
    });
  });

  describe('getBalance', () => {
    it('should get the balance of an account', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 1000,
      });

      const balance = await accountService.getBalance('123');

      expect(balance).toBe(1000);
    });

    it('should throw an error when account is not found', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(accountService.getBalance('123')).rejects.toThrow(
        'Account not found'
      );
    });
  });

  describe('deposit', () => {
    it('should deposit money into an account', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 1000,
      });

      await accountService.deposit('123', 500);

      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { balance: 1500 },
      });

      expect(prisma.account.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when account is not found', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(accountService.deposit('123', 500)).rejects.toThrow(
        'Account not found'
      );
    });
  });

  describe('withdraw', () => {
    it('should withdraw money from an account', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 1000,
      });

      await accountService.withdraw('123', 500);

      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: { balance: 500 },
      });

      expect(prisma.account.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when account is not found', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(accountService.withdraw('123', 500)).rejects.toThrow(
        'Account not found'
      );
    });

    it('should throw an error when there is not enough balance', async () => {
      (prisma.account.findUnique as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        password: 'hashedPassword',
        balance: 500,
      });

      await expect(accountService.withdraw('123', 1000)).rejects.toThrow(
        'Insufficient balance'
      );

      await expect(accountService.withdraw('123', 501)).rejects.toThrow(
        'Insufficient balance'
      );
    });
  });
});
