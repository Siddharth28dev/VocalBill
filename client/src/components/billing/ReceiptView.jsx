import { useEffect, useState } from "react"
import api from "../../api/axios"

export default function ReceiptView({ cart, paymentMethod }) {

  const [settings,setSettings] = useState(null)

  useEffect(()=>{
    api.get("/settings").then(res=>setSettings(res.data))
  },[])

  if(!cart || !settings) return null

  const subtotal = cart.total
  const tax = (subtotal * (settings.taxPercent || 0)) / 100
  const finalTotal = subtotal + tax

  return (

    <div className="print-area hidden print:block">

      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{settings.storeName}</h2>
        <p>{settings.address}</p>
        <p>GST: {settings.gstNumber}</p>
        <p className="mt-2">{settings.receiptHeader}</p>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border p-1">Item</th>
            <th className="border p-1">Qty</th>
            <th className="border p-1">Price</th>
            <th className="border p-1">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((i,idx)=>(
            <tr key={idx}>
              <td className="border p-1">{i.name}</td>
              <td className="border p-1">{i.quantity}</td>
              <td className="border p-1">{i.price}</td>
              <td className="border p-1">{i.price * i.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax: ₹{tax}</p>
        <p className="font-bold">Total: ₹{finalTotal}</p>
        <p>Payment: {paymentMethod}</p>
      </div>

    </div>

  )
}