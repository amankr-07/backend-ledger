const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const accountController = require("../controllers/account.controller")

const router = express.Router()

/**
 * - POST /api/accounts/ 
 * - Create a new account
 * - Protected route
 */
router.post("/", authMiddleware.authMiddleware,  accountController.createAccountController)

/**
 * - GET /api/accounts/ 
 * - Get all accounts of the logged-in user
 * - Protected route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 * - Get all account balance
 * - Protected route
 */
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceControiller)

module.exports = router