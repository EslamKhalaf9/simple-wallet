import express from 'express';

import accountController from '../controllers/account.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { createAccountSchema } from '../dtos/create-account.dto';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Open Account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAccountDto'
 *     responses:
 *       201:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Account with this email already exists or validation error
 *
 */
router.post(
  '/',
  validateBody(createAccountSchema),
  accountController.createAccount
);

/**
 * @swagger
 * /account/balance:
 *   get:
 *     summary: Get balance
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 'EGP 10,110.00'
 *       401:
 *         description: Unauthenticated
 */
router.get('/balance', isAuthenticated, accountController.getBalance);

export default router;
