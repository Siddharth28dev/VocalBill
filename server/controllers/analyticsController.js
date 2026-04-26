const Transaction = require("../models/Transaction")

exports.getAnalytics = async (req, res) => {

  const today = new Date()
  today.setHours(0,0,0,0)

  const todayTransactions = await Transaction.find({
    createdAt: { $gte: today }
  })

  const todayRevenue = todayTransactions.reduce((sum,t)=>sum+t.total,0)

  const ordersToday = todayTransactions.length

  const itemsSold = todayTransactions.reduce((sum,t)=>{
    return sum + t.items.reduce((s,i)=>s+i.quantity,0)
  },0)

  const avgOrderValue = ordersToday
    ? todayRevenue / ordersToday
    : 0

  const last7Days = new Date()
  last7Days.setDate(last7Days.getDate()-6)
  last7Days.setHours(0,0,0,0)

  const weeklyTransactions = await Transaction.find({
    createdAt: { $gte: last7Days }
  })

  const revenueTrend = {}

  weeklyTransactions.forEach(t=>{
    const d = t.createdAt.toISOString().slice(0,10)
    revenueTrend[d] = (revenueTrend[d] || 0) + t.total
  })

  const productSales = {}

  weeklyTransactions.forEach(t=>{
    t.items.forEach(i=>{
      productSales[i.name] = (productSales[i.name] || 0) + i.quantity
    })
  })

  res.json({
    todayRevenue,
    ordersToday,
    itemsSold,
    avgOrderValue,
    revenueTrend,
    productSales
  })

}