const Settings = require("../models/Settings")
const Cart = require("../models/Cart")
const Transaction = require("../models/Transaction")
const Product = require("../models/Product")
const { parseCommand } = require("./nluService")

async function getCart() {

  let cart = await Cart.findOne()

  if (!cart) {
    cart = await Cart.create({ items: [], total: 0 })
  }

  return cart
}

async function addItem(name, quantity) {

  const product = await Product.findOne({ name })

  if (!product) throw new Error("Product not found")

  const cart = await getCart()

  const existing = cart.items.find(i => i.name === name)

  if (existing) {
    existing.quantity += quantity
  } else {
    cart.items.push({
      name,
      quantity,
      price: product.price
    })
  }

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  )

  await cart.save()

  return cart
}

async function removeItem(name, quantity) {

  const cart = await getCart()

  const existing = cart.items.find(
    i => i.name.toLowerCase() === name.toLowerCase()
  )

  if (!existing) return cart

  existing.quantity -= quantity

  if (existing.quantity <= 0) {
    cart.items = cart.items.filter(
      i => i.name.toLowerCase() !== name.toLowerCase()
    )
  }

  cart.total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  )

  await cart.save()

  return cart
}

async function finalizeBill(method = "cash") {

  const cart = await getCart()

  if (!cart.items.length) {
    throw new Error("Cart empty")
  }

  // 🔥 STOCK UPDATE
  const products = await Product.find()

  for (const item of cart.items) {

    const product = products.find(
      p => p.name.toLowerCase() === item.name.toLowerCase()
    )

    if (!product) continue

    product.stock = Math.max(0, product.stock - item.quantity)

    await product.save()
  }

  // 🔥 TAX FROM SETTINGS
  const settings = await Settings.findOne()

  const taxPercent = settings?.taxPercent || 0

  const subtotal = cart.total
  const taxAmount = (subtotal * taxPercent) / 100
  const finalTotal = subtotal + taxAmount

  const transaction = await Transaction.create({
    items: cart.items.map(i => ({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      subtotal: i.quantity * i.price
    })),
    subtotal: subtotal,
    tax: taxAmount,
    discount: 0,
    total: finalTotal,
    paymentMethod: method,
    status: "completed"
  })

  await Cart.deleteMany()

  return transaction
}

async function processCommand(transcript) {

  const parsed = await parseCommand(transcript)

  if (parsed.intent === "ADD") {
    const item = parsed.items[0]
    return await addItem(item.name, item.quantity)
  }

  if (parsed.intent === "REMOVE") {
  const item = parsed.items[0]
  return await removeItem(item.name, item.quantity)
}

  if (parsed.intent === "FINALIZE") {
    return await finalizeBill("voice")
  }

  return { message: "Command ignored" }
}

module.exports = {
  processCommand,
  finalizeBill
}