const Transaction = require("../models/Transaction")

exports.getTransactions = async (req, res) => {

  const transactions = await Transaction
    .find()
    .sort({ createdAt: -1 })

  res.json(transactions)

}