import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import accountService from '../../src/services/account.service';
import authService from '../../src/services/auth.service';

jest.mock('../../src/services/account.service');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('authService', () => {
  describe('login', () => {
    const email = 'user@example.com';
    const password = 'aA!12345678';

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return a token when email and password are valid', async () => {
      (accountService.findAccountByEmail as jest.Mock).mockResolvedValue({
        id: '123',
        email,
        password: 'hashedPassword',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      (jwt.sign as jest.Mock).mockReturnValue('token');

      const token = await authService.login({ email, password });

      expect(token).toBe('token');
    });

    it('should throw an error when there is no matching account for the email', async () => {
      (accountService.findAccountByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.login({ email, password })).rejects.toThrow(
        'Invalid Credentials'
      );
    });

    it('should throw an error when the password is incorrect', async () => {
      (accountService.findAccountByEmail as jest.Mock).mockResolvedValue({
        id: '123',
        email,
        password: 'hashedPassword',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login({ email, password })).rejects.toThrow(
        'Invalid Credentials'
      );
    });
  });
});
