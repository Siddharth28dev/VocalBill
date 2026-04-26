import { useState, useEffect } from "react"
import api from "../../api/axios"

export default function BillingSummary({ cart, refreshCart, setPaymentMethod }) {

  const [method, setMethod] = useState("cash")
  const [taxPercent, setTaxPercent] = useState(0)

  useEffect(() => {

  const loadTax = async () => {
    const res = await api.get("/settings")
    setTaxPercent(res.data.taxPercent || 0)
  }

  loadTax()

}, [])

  const subtotal = cart?.total || 0
  const tax = (subtotal * taxPercent) / 100
  const discount = 0
  const finalTotal = subtotal + tax - discount

  const checkout = async () => {

    try {

      setPaymentMethod(method)

      await api.post("/billing/checkout", {
        paymentMethod: method
      })

      alert("Payment Successful")
      refreshCart()

    } catch (err) {
      alert("Checkout failed")
    }

  }

  const cancel = async () => {

    await api.post("/billing/command", {
      transcript: "cancel"
    })

    refreshCart()

  }

  return (

    <div className="glass-card hover-premium rounded-2xl p-6 space-y-6">

      <h2 className="text-lg font-semibold">
        Billing Summary
      </h2>

      {/* ITEMS */}
      <div className="space-y-2 max-h-60 overflow-y-auto">

        {cart?.items?.length ? (

          cart.items.map((item, i) => {

            const sub = item.quantity * item.price

            return (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{sub}</span>
              </div>
            )
          })

        ) : (
          <p className="text-gray-500">No items</p>
        )}

      </div>

      <hr/>

      {/* TOTALS */}
      <div className="space-y-1 text-sm">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>₹{tax}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>₹{discount}</span>
        </div>

        <div className="flex justify-between font-bold text-lg pt-2">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

      </div>

      {/* PAYMENT METHOD */}
      <div className="space-y-2">

        <p className="font-semibold text-sm">
          Select Payment Method
        </p>

        <div className="grid grid-cols-3 gap-2">

          <button
            onClick={() => setMethod("cash")}
            className={`py-2 rounded-lg border
              ${method === "cash"
                ? "bg-black text-white"
                : "bg-white dark:bg-gray-800"
              }`}
          >
            Cash
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`py-2 rounded-lg border
              ${method === "card"
                ? "bg-black text-white"
                : "bg-white dark:bg-gray-800"
              }`}
          >
            Card
          </button>

          <button
            onClick={() => setMethod("upi")}
            className={`py-2 rounded-lg border
              ${method === "upi"
                ? "bg-black text-white"
                : "bg-white dark:bg-gray-800"
              }`}
          >
            UPI
          </button>

        </div>

      </div>

      {/* ACTION BUTTONS */}
      <button
        onClick={checkout}
        className="
w-full
bg-gradient-to-r from-green-600 to-green-500
text-white py-3 rounded-2xl font-semibold
shadow-lg
transition
hover:scale-[1.03]
hover:shadow-green-400/40
"
      >
        Complete Payment
      </button>

      <button
        onClick={()=>window.print()}
        className="w-full border py-2 rounded-lg"
      >
        Print Receipt
      </button>

      <button
        onClick={cancel}
        className="w-full border py-2 rounded-lg text-red-500"
      >
        Cancel Order
      </button>

    </div>

  )

}