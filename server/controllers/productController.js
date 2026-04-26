const Product = require("../models/Product")

exports.getProducts = async (req, res) => {

  const products = await Product.find().sort({ createdAt: -1 })
  res.json(products)

}

exports.createProduct = async (req, res) => {

  const product = new Product(req.body)
  await product.save()
  res.json(product)

}

exports.updateProduct = async (req, res) => {

  try {

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}

exports.deleteProduct = async (req, res) => {

  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })

}

exports.searchProducts = async (req, res) => {
   try {
      const keyword = req.query.q

      const products = await Product.find({
         name: { $regex: keyword, $options: "i" }
      })

      res.json(products)
   } catch (err) {
      res.status(500).json({ message: err.message })
   }
}