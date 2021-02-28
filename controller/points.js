const Transaction = require('../schema/Transaction')

const transactions = []
let spending = {}
let payers = {}

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

exports.getPayers = (req, res) => {
    // const payers = {}
    // transactions.map((transaction)=>{
    //     const {payer, points} = transaction
    //     if (payer in payers){
    //         payers[payer] += points
    //     }
    //     else{
    //         payers[payer] = points
    //     }
    // })

    return res.status(200).json(
        payers
    )

}

