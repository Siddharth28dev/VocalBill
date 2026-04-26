import CartView from "../CartView"

export default function CartPanel({ cart, updateCart }) {

  return (

    <div className="
glass-card hover-premium p-6 rounded-2xl
bg-gradient-to-br from-gray-50/60 to-white/20
dark:from-gray-900/40 dark:to-transparent
">

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        🛒 Cart
      </h2>

      <CartView cart={cart} updateCart={updateCart} />

    </div>

  )

}