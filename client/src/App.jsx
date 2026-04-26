import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./components/layout/Layout"

import Dashboard from "./pages/Dashboard"
import Billing from "./pages/Billing"
import Products from "./pages/Products"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"

function App() {

  return (

    <BrowserRouter>

      <Layout>

        <Routes>

          <Route path="/" element={<Dashboard/>} />
          <Route path="/billing" element={<Billing/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/settings" element={<Settings/>} />

        </Routes>

      </Layout>

    </BrowserRouter>

  )

}

export default App