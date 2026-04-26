import { useEffect, useState } from "react"
import api from "../api/axios"
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, ResponsiveContainer
} from "recharts"

export default function Analytics() {

  const [data,setData] = useState(null)

  useEffect(()=>{
    api.get("/analytics").then(res=>{
      setData(res.data)
    })
  },[])

  if(!data) return <div>Loading...</div>

  const trend = Object.keys(data.revenueTrend).map(d=>({
    date:d,
    revenue:data.revenueTrend[d]
  }))

  const products = Object.keys(data.productSales).map(p=>({
    name:p,
    quantity:data.productSales[p]
  }))

  return (

    <div className="space-y-8">

      <h1 className="section-title">
        Sales Analytics
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">
          <p className="text-sm text-gray-500">Today's Revenue</p>
          <h2 className="text-2xl font-bold">₹{data.todayRevenue}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">
          <p className="text-sm text-gray-500">Orders Today</p>
          <h2 className="text-2xl font-bold">{data.ordersToday}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">
          <p className="text-sm text-gray-500">Items Sold</p>
          <h2 className="text-2xl font-bold">{data.itemsSold}</h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <h2 className="text-2xl font-bold">
            ₹{data.avgOrderValue.toFixed(2)}
          </h2>
        </div>

      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">

        <h2 className="font-semibold mb-4">
          Revenue Trend (Last 7 Days)
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="revenue"/>
          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-card">

        <h2 className="font-semibold mb-4">
          Top Selling Products
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={products}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="quantity"/>
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>

  )

}