import express from 'express';

import accountController from '../controllers/account.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { createAccountSchema } from '../dtos/create-account.dto';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.post(
  '/',
  validateBody(createAccountSchema),
  accountController.createAccount
);

router.get('/balance', isAuthenticated, accountController.getBalance);

export default router;
