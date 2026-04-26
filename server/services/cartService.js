const Cart = require("../models/Cart");

const getCart = async () => {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ items: [], total: 0 });
    await cart.save();
  }

  return cart;
};

const clearCart = async () => {
  const cart = await Cart.findOne();

  if (cart) {
    cart.items = [];
    cart.total = 0;
    await cart.save();
  }

  return cart;
};

module.exports = {
  getCart,
  clearCart
};