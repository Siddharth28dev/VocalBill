const express = require("express")
const router = express.Router()

const {
  searchProducts,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController")


router.get("/search", searchProducts)

router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router