const express = require("express")
const router = express.Router()

const { processCommand, finalizeBill } = require("../services/billingService")

router.post("/command", async (req, res, next) => {

  try {

    console.log("VOICE COMMAND HIT")

    const { transcript } = req.body

    const result = await processCommand(transcript)

    res.json(result)

  } catch (err) {
    next(err)
  }

})

router.post("/checkout", async (req, res, next) => {

  try {

    console.log("MANUAL CHECKOUT HIT")

    const { paymentMethod } = req.body

    const result = await finalizeBill(paymentMethod)

    res.json(result)

  } catch (err) {
    next(err)
  }

})

module.exports = router