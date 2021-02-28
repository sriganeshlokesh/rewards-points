const express = require('express')
const router = express.Router()
const {addPoints, getPayers, spendPoints} = require('../controller/points')

// @route POST /points/transaction
// @desc Add transaction route
// @access Public
router.post('/transaction', addPoints)

// @route POST /points/spend
// @desc Spend points route
// @access Public
router.post('/spend', spendPoints)

// @route GET /points/balance
// @desc Get payer balance route
// @access Public
router.get('/balance', getPayers)


module.exports = router
