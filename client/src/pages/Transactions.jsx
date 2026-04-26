import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Transactions() {

  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState(null)

  const fetchTransactions = async () => {

    const res = await api.get("/transactions")
    setTransactions(res.data)

  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const filtered = transactions.filter(t =>
    t._id.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Transactions
      </h1>

      <input
        placeholder="Search by Order ID..."
        className="border px-3 py-2 rounded-lg w-64"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card">

        <table className="w-full">

          <thead className="border-b">
            <tr className="text-left">
              <th className="p-3">Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map(t => (

              <tr key={t._id} className="border-b">

                <td className="p-3">{t._id.slice(-6)}</td>
                <td>{new Date(t.createdAt).toLocaleString()}</td>
                <td>₹{t.total}</td>
                <td>{t.paymentMethod}</td>
                <td>{t.status}</td>

                <td>
                  <button
                    onClick={()=>setSelected(t)}
                    className="text-blue-500"
                  >
                    View
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ORDER MODAL */}
      {selected && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 space-y-4">

            <h2 className="font-semibold text-lg">
              Order Details
            </h2>

            {selected.items.map((item,i)=>(
              <div key={i} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.subtotal}</span>
              </div>
            ))}

            <hr/>

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{selected.total}</span>
            </div>

            <button
              className="w-full border py-2 rounded-lg"
              onClick={()=>window.print()}
            >
              Print Receipt
            </button>

            <button
              className="w-full border py-2 rounded-lg"
              onClick={()=>setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )

}