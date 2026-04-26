const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  total: {
    type: Number,
    default: 0
  }

})

module.exports = mongoose.model("Cart", cartSchema)