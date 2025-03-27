import express from 'express';

import authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { loginSchema } from '../dtos/login.dto';

const router = express.Router();

router.post('/', validateBody(loginSchema), authController.login);

export default router;
