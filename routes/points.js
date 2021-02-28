const express = require('express')
const router = express.Router()
const {addPoints, getPayers, spendPoints} = require('../controller/points')

// Add Points
router.post('/transaction', addPoints)

// Spend Points
router.post('/spend', spendPoints)

// Get Points Balance
router.get('/balance', getPayers)


module.exports = router
