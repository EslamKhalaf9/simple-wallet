import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginDto } from '../dtos/login.dto';
import accountService from './account.service';
import AppError from '../interfaces/app-error.interface';

async function login({ email, password }: LoginDto): Promise<string> {
  const account = await accountService.findAccountByEmail(email);

  if (!account || !(await bcrypt.compare(password, account.password))) {
    throw new AppError(401, 'Invalid Credentials');
  }

  return jwt.sign({ id: account.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
  });
}

export default { login };
