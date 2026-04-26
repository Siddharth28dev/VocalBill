import {
  LayoutDashboard,
  CreditCard,
  Package,
  Receipt,
  BarChart3,
  FileText,
  Settings
} from "lucide-react"
import { NavLink } from "react-router-dom"

export default function Sidebar() {

  const base =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"

  const active =
    "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg scale-[1.02]"

  const inactive =
    "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/5 hover:scale-[1.02]"

  return (

    <div className="w-64 h-screen p-5
      bg-gradient-to-b
      from-blue-50 via-white to-gray-100
      dark:from-gray-950 dark:via-gray-900 dark:to-black
      border-r border-white/30 dark:border-white/5">

      <h2 className="text-2xl font-bold mb-10
        bg-gradient-to-r from-blue-600 to-red-500
        bg-clip-text text-transparent">
        POS Dashboard
      </h2>

      <nav className="flex flex-col gap-3">

        <NavLink to="/" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <LayoutDashboard size={18}/>
          Dashboard
        </NavLink>

        <NavLink to="/billing" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <CreditCard size={18}/>
          POS Billing
        </NavLink>

        <NavLink to="/products" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <Package size={18}/>
          Products
        </NavLink>

        <NavLink to="/transactions" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <Receipt size={18}/>
          Transactions
        </NavLink>

        <NavLink to="/analytics" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <BarChart3 size={18}/>
          Sales Analytics
        </NavLink>

        <NavLink to="/reports" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <FileText size={18}/>
          Reports
        </NavLink>

        <NavLink to="/settings" className={({isActive}) =>
          `${base} ${isActive ? active : inactive}`
        }>
          <Settings size={18}/>
          Settings
        </NavLink>

      </nav>

    </div>

  )

}