import express from 'express';

import authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { loginSchema } from '../dtos/login.dto';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', validateBody(loginSchema), authController.login);
router.get('/me', isAuthenticated, authController.me);

export default router;
