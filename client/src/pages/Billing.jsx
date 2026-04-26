import { useState } from "react"

import ReceiptView from "../components/billing/ReceiptView"
import VoiceConsole from "../components/billing/VoiceConsole"
import CartPanel from "../components/billing/CartPanel"
import BillingSummary from "../components/billing/BillingSummary"
import ManualProductSearch from "../components/billing/ManualProductSearch"

export default function Billing() {

  const [cart, setCart] = useState(null)
  const [paymentMethod,setPaymentMethod] = useState("cash")

  const updateCart = (newCart) => {
    setCart(newCart)
  }

  const refreshCart = () => {
  setCart(null)
}

  return (

    <div className="grid grid-cols-3 gap-8">

      {/* LEFT */}
      <VoiceConsole updateCart={updateCart} />

      {/* CENTER */}
      <div className="space-y-6">

        <ManualProductSearch updateCart={updateCart} />

        <CartPanel cart={cart} updateCart={updateCart} />

      </div>

      {/* RIGHT */}
      <BillingSummary
  cart={cart}
  refreshCart={refreshCart}
  setPaymentMethod={setPaymentMethod}
/>

<ReceiptView
  cart={cart}
  paymentMethod={paymentMethod}
/>

    </div>

  )

}