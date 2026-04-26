import { useEffect, useState } from "react"
import api from "../api/axios"
import { capitalizeWords } from "../utils/formatText"

export default function Products() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    aliases: ""
  })

  const fetchProducts = async () => {
    const res = await api.get("/products")
    setProducts(res.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`)
    fetchProducts()
  }

  const startEdit = (p) => {

    setEditingProduct(p._id)

    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      category: p.category,
      aliases: p.aliases?.join(",")
    })
  }

  const updateProduct = async () => {

    await api.put(`/products/${editingProduct}`, {
      ...form,
      aliases: form.aliases.split(",")
    })

    setEditingProduct(null)

    fetchProducts()
  }

  const createProduct = async () => {

  await api.post("/products", {
    ...form,
    price: Number(form.price),
    stock: Number(form.stock),
    aliases: form.aliases
      .split(",")
      .map(a => a.trim().toLowerCase())
  })

  setShowAddModal(false)

  setForm({
    name: "",
    price: "",
    stock: "",
    category: "",
    aliases: ""
  })

  fetchProducts()
}

  const categories = [
    "All",
    ...new Set(products.map(p => p.category))
  ]

  const filteredProducts = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(p =>
      category === "All" ? true : p.category === category
    )

  return (

    <div className="space-y-6">

      <h1 className="section-title">
        Product Management
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 items-center">

        <input
          placeholder="Search product..."
          className="border rounded-lg px-3 py-2 w-64"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button
  onClick={()=>setShowAddModal(true)}
  className="
  ml-auto
  px-5 py-2
  rounded-xl
  bg-gradient-to-r from-blue-600 to-blue-500
  text-white font-semibold
  shadow hover:scale-105 transition
  ">
  + Add Product
</button>

      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-4 gap-6">

        {filteredProducts.map(p => (

          <div
            key={p._id}
            className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-card space-y-2"
          >

            <h2 className="font-semibold text-lg">
              {capitalizeWords(p.name)}
            </h2>

            <p>₹{p.price}</p>
            <p>Stock: {p.stock}</p>
            <p className="text-sm text-gray-500">
              Category: {p.category}
            </p>

            <div className="flex gap-2 pt-2">

              <button
                onClick={()=>startEdit(p)}
                className="px-3 py-1 border rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={()=>deleteProduct(p._id)}
                className="px-3 py-1 border rounded-lg text-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* EDIT MODAL */}
      {editingProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 space-y-3">

            <h2 className="font-semibold text-lg">
              Edit Product
            </h2>

            <input
              className="border p-2 rounded w-full"
              value={form.name}
              onChange={(e)=>setForm({...form,name:e.target.value})}
            />

            <input
              className="border p-2 rounded w-full"
              value={form.price}
              onChange={(e)=>setForm({...form,price:e.target.value})}
            />

            <input
              className="border p-2 rounded w-full"
              value={form.stock}
              onChange={(e)=>setForm({...form,stock:e.target.value})}
            />

            <input
              className="border p-2 rounded w-full"
              value={form.category}
              onChange={(e)=>setForm({...form,category:e.target.value})}
            />

            <input
              className="border p-2 rounded w-full"
              value={form.aliases}
              onChange={(e)=>setForm({...form,aliases:e.target.value})}
            />

            <div className="flex gap-3 pt-3">

              <button
                onClick={updateProduct}
                className="flex-1 bg-black text-white py-2 rounded-lg"
              >
                Update
              </button>

              <button
                onClick={()=>setEditingProduct(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {showAddModal && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 space-y-3">

      <h2 className="font-semibold text-lg">
        Add Product
      </h2>

      <input
        placeholder="Product Name"
        className="border p-2 rounded w-full"
        value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
      />

      <input
        placeholder="Price"
        className="border p-2 rounded w-full"
        value={form.price}
        onChange={(e)=>setForm({...form,price:e.target.value})}
      />

      <input
        placeholder="Stock"
        className="border p-2 rounded w-full"
        value={form.stock}
        onChange={(e)=>setForm({...form,stock:e.target.value})}
      />

      <input
        placeholder="Category"
        className="border p-2 rounded w-full"
        value={form.category}
        onChange={(e)=>setForm({...form,category:e.target.value})}
      />

      <input
        placeholder="Voice Aliases (comma separated)"
        className="border p-2 rounded w-full"
        value={form.aliases}
        onChange={(e)=>setForm({...form,aliases:e.target.value})}
      />

      <div className="flex gap-3 pt-3">

        <button
          onClick={createProduct}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
        >
          Save
        </button>

        <button
          onClick={()=>setShowAddModal(false)}
          className="flex-1 border py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

    </div>

  )

}