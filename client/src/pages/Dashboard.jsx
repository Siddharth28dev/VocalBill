import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Dashboard() {

  const [analytics,setAnalytics] = useState(null)
  const [transactions,setTransactions] = useState([])
  const [lowStock,setLowStock] = useState([])

  const loadData = async () => {

  const a = await api.get("/analytics")
  setAnalytics(a.data)

  const t = await api.get("/transactions")
  setTransactions(t.data.slice(0,5))

  const p = await api.get("/products")
  const low = p.data.filter(prod => prod.stock <= 5)
  setLowStock(low)

}

  useEffect(()=>{
    loadData()

    const interval = setInterval(loadData,5000)

    return ()=>clearInterval(interval)

  },[])

  if(!analytics) return <div>Loading...</div>

  const topProducts = Object.entries(analytics.productSales)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5)

  return (

    <div className="space-y-8">

      <h1 className="section-title">
        Store Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-6">

        <Card title="Today's Revenue" value={`₹${analytics.todayRevenue}`} />
        <Card title="Orders Today" value={analytics.ordersToday} />
        <Card title="Items Sold" value={analytics.itemsSold} />
        <Card title="Avg Order Value" value={`₹${analytics.avgOrderValue.toFixed(2)}`} />

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* Top Products */}
        <div className="bg-gradient-to-br from-orange-50/40 to-white/20
dark:from-orange-900/10 dark:to-transparent">
          <h2 className="font-semibold mb-4">
            Top Selling Products
          </h2>

          {topProducts.map(([name,qty])=>(
            <div key={name} className="flex justify-between py-1">
              <span>{name}</span>
              <span>{qty}</span>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-gradient-to-br from-gray-50/40 to-white/20
dark:from-gray-900/20 dark:to-transparent">
          <h2 className="font-semibold mb-4">
            Recent Orders
          </h2>

          {transactions.map(t=>(
            <div key={t._id} className="flex justify-between py-1">
              <span>{t._id.slice(-6)}</span>
              <span>₹{t.total}</span>
            </div>
          ))}
        </div>

{/* Low Stock Alerts */}
<div className="glass-card hover-premium p-6 rounded-2xl">
  <h2 className="font-semibold mb-4">
    Low Stock Alerts
  </h2>

  {lowStock.length === 0 && (
    <p className="text-gray-500">All stock levels healthy</p>
  )}

  {lowStock.map(p=>(
    <div key={p._id} className="flex justify-between py-1 text-red-500">
      <span>{capitalizeWords(p.name)}</span>
      <span>{p.stock}</span>
    </div>
  ))}
</div>

      </div>

    </div>

  )

}

function Card({ title, value }) {

  return (
    <div className="
      glass-card hover-premium
      p-6 rounded-2xl
      bg-gradient-to-br
      from-blue-50/50 to-white/20
      dark:from-blue-900/20 dark:to-transparent
      transition
      hover:scale-[1.02]
    ">

      <p className="text-sm text-gray-500 mb-2">
        {title}
      </p>

      <h2 className="
        text-3xl font-bold
        bg-gradient-to-r
        from-blue-600 to-blue-400
        bg-clip-text text-transparent
      ">
        {value}
      </h2>

    </div>
  )

}