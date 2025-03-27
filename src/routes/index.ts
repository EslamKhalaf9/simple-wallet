import express from 'express';

import accountRouter from './account.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.use('/account', accountRouter);
router.use('/auth', authRouter);

export default router;
