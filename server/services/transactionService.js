const Transaction = require("../models/Transaction");

const createTransaction = async (data) => {
  const transaction = new Transaction(data);
  return await transaction.save();
};

const getTransactions = async () => {
  return await Transaction.find().sort({ createdAt: -1 });
};

module.exports = {
  createTransaction,
  getTransactions
};