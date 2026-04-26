const mongoose = require("mongoose")
require("dotenv").config()

const Product = require("./models/Product")

const products = [

  // Fruits
  { name:"Banana", price:40, stock:120, category:"Fruits", aliases:["banana","bananas","kela"] },
  { name:"Apple", price:120, stock:90, category:"Fruits", aliases:["apple","seb"] },
  { name:"Orange", price:80, stock:70, category:"Fruits", aliases:["orange","santra"] },
  { name:"Mango", price:150, stock:60, category:"Fruits", aliases:["mango","aam"] },
  { name:"Pineapple", price:90, stock:50, category:"Fruits", aliases:["pineapple"] },
  { name:"Papaya", price:60, stock:55, category:"Fruits", aliases:["papaya"] },
  { name:"Grapes", price:110, stock:65, category:"Fruits", aliases:["grapes","angoor"] },
  { name:"Watermelon", price:70, stock:40, category:"Fruits", aliases:["watermelon"] },
  { name:"Guava", price:50, stock:75, category:"Fruits", aliases:["guava"] },
  { name:"Strawberry", price:200, stock:30, category:"Fruits", aliases:["strawberry"] },

  // Vegetables
  { name:"Potato", price:30, stock:150, category:"Vegetables", aliases:["potato","aloo"] },
  { name:"Onion", price:35, stock:130, category:"Vegetables", aliases:["onion","pyaz"] },
  { name:"Tomato", price:40, stock:110, category:"Vegetables", aliases:["tomato"] },
  { name:"Carrot", price:50, stock:80, category:"Vegetables", aliases:["carrot"] },
  { name:"Cabbage", price:45, stock:60, category:"Vegetables", aliases:["cabbage"] },
  { name:"Cauliflower", price:55, stock:55, category:"Vegetables", aliases:["cauliflower"] },
  { name:"Spinach", price:25, stock:90, category:"Vegetables", aliases:["spinach","palak"] },
  { name:"Brinjal", price:35, stock:70, category:"Vegetables", aliases:["brinjal","baingan"] },
  { name:"Peas", price:60, stock:65, category:"Vegetables", aliases:["peas","matar"] },
  { name:"Capsicum", price:80, stock:50, category:"Vegetables", aliases:["capsicum"] },

  // Dairy
  { name:"Milk", price:60, stock:100, category:"Dairy", aliases:["milk","doodh"] },
  { name:"Curd", price:50, stock:80, category:"Dairy", aliases:["curd","dahi"] },
  { name:"Paneer", price:350, stock:40, category:"Dairy", aliases:["paneer"] },
  { name:"Butter", price:250, stock:35, category:"Dairy", aliases:["butter"] },
  { name:"Cheese", price:300, stock:45, category:"Dairy", aliases:["cheese"] },

  // Grains
  { name:"Rice", price:70, stock:200, category:"Grains", aliases:["rice","chawal"] },
  { name:"Wheat Flour", price:55, stock:180, category:"Grains", aliases:["atta","flour"] },
  { name:"Maida", price:60, stock:120, category:"Grains", aliases:["maida"] },
  { name:"Suji", price:50, stock:110, category:"Grains", aliases:["suji","rava"] },
  { name:"Poha", price:45, stock:100, category:"Grains", aliases:["poha"] },

  // Pulses
  { name:"Toor Dal", price:120, stock:90, category:"Pulses", aliases:["toor","arhar"] },
  { name:"Moong Dal", price:130, stock:85, category:"Pulses", aliases:["moong"] },
  { name:"Chana Dal", price:110, stock:95, category:"Pulses", aliases:["chana"] },
  { name:"Masoor Dal", price:115, stock:80, category:"Pulses", aliases:["masoor"] },
  { name:"Rajma", price:140, stock:70, category:"Pulses", aliases:["rajma"] },

  // Oils
  { name:"Mustard Oil", price:180, stock:60, category:"Oil", aliases:["mustard oil"] },
  { name:"Sunflower Oil", price:170, stock:65, category:"Oil", aliases:["sunflower"] },
  { name:"Olive Oil", price:600, stock:25, category:"Oil", aliases:["olive"] },

  // Snacks
  { name:"Lays Chips", price:20, stock:150, category:"Snacks", aliases:["lays","chips"] },
  { name:"Kurkure", price:20, stock:140, category:"Snacks", aliases:["kurkure"] },
  { name:"Bingo Chips", price:25, stock:130, category:"Snacks", aliases:["bingo"] },
  { name:"Namkeen", price:60, stock:100, category:"Snacks", aliases:["namkeen"] },
  { name:"Popcorn", price:80, stock:70, category:"Snacks", aliases:["popcorn"] },

  // Chocolates
  { name:"Dairy Milk", price:90, stock:120, category:"Chocolate", aliases:["dairy milk","cadbury"] },
  { name:"KitKat", price:40, stock:100, category:"Chocolate", aliases:["kitkat"] },
  { name:"Perk", price:20, stock:110, category:"Chocolate", aliases:["perk"] },
  { name:"5 Star", price:30, stock:105, category:"Chocolate", aliases:["5star"] },
  { name:"Snickers", price:50, stock:95, category:"Chocolate", aliases:["snickers"] },

  // Beverages
  { name:"Coca Cola", price:40, stock:100, category:"Beverages", aliases:["coke"] },
  { name:"Pepsi", price:40, stock:95, category:"Beverages", aliases:["pepsi"] },
  { name:"Sprite", price:40, stock:90, category:"Beverages", aliases:["sprite"] },
  { name:"Fanta", price:40, stock:85, category:"Beverages", aliases:["fanta"] },
  { name:"Red Bull", price:120, stock:60, category:"Beverages", aliases:["redbull"] },

  // Biscuits
  { name:"Parle G", price:10, stock:200, category:"Biscuits", aliases:["parle"] },
  { name:"Good Day", price:30, stock:150, category:"Biscuits", aliases:["goodday"] },
  { name:"Marie", price:25, stock:140, category:"Biscuits", aliases:["marie"] },
  { name:"Hide and Seek", price:35, stock:120, category:"Biscuits", aliases:["hide seek"] },
  { name:"Oreo", price:40, stock:110, category:"Biscuits", aliases:["oreo"] },

  // Household
  { name:"Surf Excel", price:220, stock:60, category:"Household", aliases:["surf"] },
  { name:"Ariel", price:210, stock:55, category:"Household", aliases:["ariel"] },
  { name:"Vim Bar", price:30, stock:100, category:"Household", aliases:["vim"] },
  { name:"Harpic", price:95, stock:80, category:"Household", aliases:["harpic"] },
  { name:"Lizol", price:110, stock:75, category:"Household", aliases:["lizol"] },

  // Personal Care
  { name:"Colgate", price:90, stock:100, category:"Personal Care", aliases:["colgate"] },
  { name:"Close Up", price:85, stock:90, category:"Personal Care", aliases:["closeup"] },
  { name:"Lux Soap", price:40, stock:120, category:"Personal Care", aliases:["lux"] },
  { name:"Dove Soap", price:60, stock:110, category:"Personal Care", aliases:["dove"] },
  { name:"Clinic Plus Shampoo", price:75, stock:95, category:"Personal Care", aliases:["clinic plus"] },

  // Bakery
  { name:"Bread", price:35, stock:90, category:"Bakery", aliases:["bread"] },
  { name:"Brown Bread", price:45, stock:70, category:"Bakery", aliases:["brown bread"] },
  { name:"Cake", price:250, stock:30, category:"Bakery", aliases:["cake"] },
  { name:"Muffin", price:40, stock:60, category:"Bakery", aliases:["muffin"] },
  { name:"Croissant", price:60, stock:40, category:"Bakery", aliases:["croissant"] },

  // Spices
  { name:"Turmeric Powder", price:50, stock:100, category:"Spices", aliases:["haldi"] },
  { name:"Chili Powder", price:60, stock:95, category:"Spices", aliases:["mirchi"] },
  { name:"Coriander Powder", price:55, stock:90, category:"Spices", aliases:["dhaniya"] },
  { name:"Garam Masala", price:80, stock:70, category:"Spices", aliases:["garam masala"] },
  { name:"Salt", price:20, stock:150, category:"Spices", aliases:["namak"] },

  // Eggs & Meat
  { name:"Egg Tray", price:180, stock:50, category:"Protein", aliases:["eggs"] },
  { name:"Chicken", price:240, stock:40, category:"Protein", aliases:["chicken"] },
  { name:"Fish", price:300, stock:30, category:"Protein", aliases:["fish"] },
  { name:"Mutton", price:600, stock:20, category:"Protein", aliases:["mutton"] },
  { name:"Soya Chunks", price:120, stock:60, category:"Protein", aliases:["soya"] }

]

async function seed() {

  await mongoose.connect(process.env.MONGO_URI)

  await Product.deleteMany()

  await Product.insertMany(products)

  console.log("✅ 100 Grocery Products Seeded")

  process.exit()
}

seed()