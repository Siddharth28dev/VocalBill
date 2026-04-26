const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    index: true
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    default: 0
  },

  category: {
    type: String,
    default: "General"
  },

  aliases: {
    type: [String],
    default: []
  },

  lowStockThreshold: {
    type: Number,
    default: 5
  }

}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)