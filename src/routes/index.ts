import express from 'express';

import accountRouter from './account.routes';

const router = express.Router();

router.use('/account', accountRouter);

export default router;
