import { useState, useEffect } from "react"
import api from "../../api/axios"

export default function ManualProductSearch({ updateCart }) {

  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {

    const fetchProducts = async () => {

      if (!query) {
        setProducts([])
        return
      }

      try {

        const res = await api.get(`/products/search?q=${query}`)

        setProducts(res.data)

      } catch (err) {
        console.error(err)
      }

    }

    const timeout = setTimeout(fetchProducts, 300)

    return () => clearTimeout(timeout)

  }, [query])

  const addProduct = async (product) => {

    try {

      const res = await api.post("/billing/command", {
        transcript: `add one ${product.name}`
      })

      console.log("Manual Add Response:", res.data)

      // IMPORTANT FIX
      if (res.data && res.data.total !== undefined) {
        updateCart(res.data)
      }

      setQuery("")
      setProducts([])

    } catch (err) {
      console.error(err)
    }

  }

  return (

    <div className="glass-card hover-premium rounded-2xl p-6 space-y-4">

      <h2 className="text-lg font-semibold">
        Manual Product Search
      </h2>

      <input
        type="text"
        placeholder="Search product..."
        className="w-full border rounded-lg px-3 py-2 dark:bg-gray-800"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {products.length > 0 && (

        <div className="border rounded-lg divide-y dark:border-gray-700">

          {products.map(product => (

            <div
              key={product._id}
              className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => addProduct(product)}
            >

              <span>{product.name}</span>

              <span className="text-sm text-gray-500">
                ₹{product.price}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}