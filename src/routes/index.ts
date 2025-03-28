import express from 'express';

import accountRouter from './account.routes';
import authRouter from './auth.routes';
import transactionRouter from './transaction.routes';

const router = express.Router();

router.use('/account', accountRouter);
router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);

export default router;
