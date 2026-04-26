import { useEffect, useState } from "react"
import api from "../api/axios"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export default function Reports() {

  const [transactions,setTransactions] = useState([])
  const [products,setProducts] = useState([])

  useEffect(()=>{

    api.get("/transactions").then(res=>setTransactions(res.data))
    api.get("/products").then(res=>setProducts(res.data))

  },[])

  const exportSales = () => {

    const data = transactions.map(t=>({
      OrderID: t._id,
      Date: new Date(t.createdAt).toLocaleString(),
      Total: t.total,
      Payment: t.paymentMethod
    }))

    downloadExcel(data,"sales_report")

  }

  const exportInventory = () => {

    const data = products.map(p=>({
      Name: p.name,
      Price: p.price,
      Stock: p.stock,
      Category: p.category
    }))

    downloadExcel(data,"inventory_report")

  }

  const downloadExcel = (data,name) => {

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb,ws,"Report")

    const excelBuffer = XLSX.write(wb,{
      bookType:"xlsx",
      type:"array"
    })

    const blob = new Blob([excelBuffer])
    saveAs(blob,`${name}.xlsx`)
  }

  return (

    <div className="space-y-10">

      <h1 className="section-title">
        Reports
      </h1>

      <div className="flex gap-6">

        <button
          onClick={exportSales}
          className="
          px-8 py-3 rounded-2xl
          bg-gradient-to-r from-blue-600 to-blue-500
          text-white font-semibold
          shadow-lg
          transition
          hover:scale-105
          hover:shadow-blue-400/40
          ">
          Export Sales Report
        </button>

        <button
          onClick={exportInventory}
          className="
          px-8 py-3 rounded-2xl
          bg-gradient-to-r from-orange-500 to-orange-400
          text-white font-semibold
          shadow-lg
          transition
          hover:scale-105
          hover:shadow-orange-400/40
          ">
          Export Inventory Report
        </button>

      </div>

    </div>

  )

}