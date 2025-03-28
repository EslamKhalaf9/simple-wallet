import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import accountService from '../services/account.service';
import { serializeAccount } from '../serializers/account.serializer';
import RequestWithAccount from '../types/express/request';

export async function isAuthenticated(
  req: RequestWithAccount,
  res: Response,
  next: NextFunction
) {
  const [type, token] = req.headers.authorization?.split(' ') || [];

  try {
    if (type !== 'Bearer' || !token) throw new Error('Not authorized');
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!payload) {
      throw new Error('Not authorized');
    }

    const { id } = payload as { id: string };
    const account = await accountService.findAccountById(id);

    if (!account) throw new Error();
    req.account = serializeAccount(account);
    next();
  } catch (error) {
    res.status(401).send('Not authorized');
    return;
  }
}
