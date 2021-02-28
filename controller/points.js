const Transaction = require('../schema/Transaction')

const transactions = []
let spending = {}
let payers = {}

// Add Points
exports.addPoints = (req, res) => {
    const {payer, points, timestamp} = req.body
    const transaction = new Transaction(payer, points, timestamp)
    transactions.push(transaction)
    if (payer in payers){
        payers[payer] += points
    }
    else{
        payers[payer] = points
    }
    return res.status(200).json({
        transaction
    })
}

// Spend Points
exports.spendPoints = (req, res) => {
    let total = 0
    
    const spend = req.body.points

    transactions.sort((a,b)=> (new Date(a.timestamp).getTime()) - (new Date(b.timestamp).getTime()))
    transactions.some((transaction)=>{
        let {payer, points} = transaction
        if (total < spend){
            if(total + points > spend){
            points = spend - total
            total += points
            if (payer in spending){
                spending[payer] -= points
                payers[payer] -= points
            }
            else{
                spending[payer] = -points
                payers[payer] -= points
            }
            return
        }
        else{
            total += points
            if (payer in spending){
                spending[payer] -= points
                payers[payer] -= points
            }
            else{
                spending[payer] = -points
                payers[payer] -= points
            }
        }
        }
        else{
            return
        }
    })
    return res.status(200).json(
        spending
    )

}

// Get Payer balance
exports.getPayers = (req, res) => {
    return res.status(200).json(
        payers
    )
}

