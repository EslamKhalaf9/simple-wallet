import express from 'express';

import authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { loginSchema } from '../dtos/login.dto';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       201:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthenticated
 */
router.post('/', validateBody(loginSchema), authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/me', isAuthenticated, authController.me);

export default router;
