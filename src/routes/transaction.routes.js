const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const transactionController = require("../controllers/transaction.controller")

const router = express.Router()

/**
 * - Create a new transaction
 * - POST /api/transactions/
 */
router.post("/", authMiddleware.authMiddleware,  transactionController.createTransaction)

/**
 * - Create initial funds transaction from system user
 * - POST /api/transactions/system/initial-funds
 */
router.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports = router