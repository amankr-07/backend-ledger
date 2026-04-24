const accountModel = require("../models/account.model")

/**
 * - Create account controller
 * - POST /api/accounts/ 
*/
async function createAccountController(req, res){
    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    })
}

/**
 * - GET /api/accounts/ 
 * - Get all accounts of the logged-in user
 */
async function getUserAccountsController(req, res) {
    const accounts = await accountModel.find({
        user: req.user._id
    })

    res.status(201).json({
        accounts
    })
}

/**
 * - GET /api/accounts/balance/:accountId
 * - Get all account balance
 */
async function getAccountBalanceControiller(req, res) {
    const { accountId } = req.params

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    })

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }

    const balance = await account.getBalance()

    res.status(200).json({
        accountId: account._id,
        balance: balance
    })
}

module.exports = {
    createAccountController, getUserAccountsController, getAccountBalanceControiller
}