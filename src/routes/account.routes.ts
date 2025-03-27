import express from 'express';

import accountController from '../controllers/account.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { createAccountSchema } from '../dtos/create-account.dto';

const router = express.Router();

router.post(
  '/',
  validateBody(createAccountSchema),
  accountController.createAccount
);

export default router;
