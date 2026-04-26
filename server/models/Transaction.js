const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],

  subtotal: Number,
  tax: Number,
  discount: Number,
  total: Number,

  paymentMethod: {
    type: String,
    default: "cash"
  },

  status: {
    type: String,
    default: "completed"
  }

}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)