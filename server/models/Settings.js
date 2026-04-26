const mongoose = require("mongoose")

const settingsSchema = new mongoose.Schema({

  storeName: {
    type: String,
    default: "My Store"
  },

  gstNumber: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  receiptHeader: {
    type: String,
    default: "Thank you for shopping!"
  },

  taxPercent: {
    type: Number,
    default: 0
  },

  voiceSensitivity: {
    type: Number,
    default: 0.5
  },

  language: {
    type: String,
    default: "en-US"
  },

  theme: {
    type: String,
    default: "light"
  }

})

module.exports = mongoose.model("Settings", settingsSchema)