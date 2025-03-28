import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import transactionController from '../controllers/transaction.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { createTransactionSchema } from '../dtos/create-transaction.dto';

const router = express.Router();

router.post(
  '/deposit',
  isAuthenticated,
  validateBody(createTransactionSchema),
  transactionController.deposit
);
router.post(
  '/withdraw',
  isAuthenticated,
  validateBody(createTransactionSchema),
  transactionController.withdraw
);

export default router;
