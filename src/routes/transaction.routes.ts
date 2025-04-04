import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import transactionController from '../controllers/transaction.controller';
import { validateBody } from '../middlewares/zodvalidator.middleware';
import { createTransactionSchema } from '../dtos/create-transaction.dto';

const router = express.Router();

/**
 * @swagger
 * /transaction:
 *   get:
 *     summary: Get transactions
 *     tags:
 *       - Transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthenticated
 */
router.get('/', isAuthenticated, transactionController.getTransactions);

/**
 * @swagger
 * /transaction/deposit:
 *   post:
 *     summary: Withdraw amount from account balance in cents
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDto'
 *     responses:
 *       201:
 *         description: Deposit Transaction Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123456'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthenticated
 */
router.post(
  '/deposit',
  isAuthenticated,
  validateBody(createTransactionSchema),
  transactionController.deposit
);

/**
 * @swagger
 * /transaction/withdraw:
 *   post:
 *     summary: Withdraw amount from account balance in cents
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTransactionDto'
 *     responses:
 *       201:
 *         description: Withdraw Transaction Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '123456'
 *       400:
 *         description: Invalid input or insufficient balance
 *       401:
 *         description: Unauthenticated
 */
router.post(
  '/withdraw',
  isAuthenticated,
  validateBody(createTransactionSchema),
  transactionController.withdraw
);

export default router;
