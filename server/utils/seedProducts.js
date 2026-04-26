require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  { name: "apple", price: 120, unit: "kg" },
  { name: "banana", price: 60, unit: "dozen" },
  { name: "milk", price: 50, unit: "liter" },
  { name: "bread", price: 40, unit: "pack" },
  { name: "sugar", price: 45, unit: "kg" },
  { name: "rice", price: 70, unit: "kg" },
  { name: "eggs", price: 6, unit: "piece" },
  { name: "butter", price: 55, unit: "pack" }
];

const seed = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Product seed completed");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

seed();