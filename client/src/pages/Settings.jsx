import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Settings() {

  const [form, setForm] = useState({
    storeName: "",
    gstNumber: "",
    address: "",
    receiptHeader: "",
    taxPercent: 0,
    voiceSensitivity: 0.5,
    language: "en-US",
    theme: "light"
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const res = await api.get("/settings")
    setForm(res.data)
  }

  const saveSettings = async () => {
    await api.post("/settings", form)
    alert("Settings Saved")
  }

  const update = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  return (

    <div className="p-8 space-y-10 max-w-4xl">

      <h1 className="section-title">
        Settings
      </h1>

      {/* STORE SETTINGS */}
      <div className="space-y-6">

        <h2 className="text-xl font-semibold">
          Store Information
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium">
              Store Name
            </label>
            <p className="text-xs text-gray-500 mb-1">
              This name appears on receipts and dashboard.
            </p>
            <input
              className="border p-3 rounded-lg w-full"
              value={form.storeName}
              onChange={e => update("storeName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              GST Number
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Used for tax invoices and reports.
            </p>
            <input
              className="border p-3 rounded-lg w-full"
              value={form.gstNumber}
              onChange={e => update("gstNumber", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Store Address
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Printed on customer receipts.
            </p>
            <input
              className="border p-3 rounded-lg w-full"
              value={form.address}
              onChange={e => update("address", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Receipt Header
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Custom message shown at top of printed bill.
            </p>
            <input
              className="border p-3 rounded-lg w-full"
              value={form.receiptHeader}
              onChange={e => update("receiptHeader", e.target.value)}
            />
          </div>

        </div>

      </div>

      {/* SYSTEM SETTINGS */}
      <div className="space-y-6">

        <h2 className="text-xl font-semibold">
          System Configuration
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium">
              Default Tax Percentage
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Applied automatically during billing.
            </p>
            <input
              type="number"
              className="border p-3 rounded-lg w-full"
              value={form.taxPercent}
              onChange={e => update("taxPercent", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Voice Sensitivity
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Higher value increases voice command detection tolerance.
            </p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={form.voiceSensitivity}
              onChange={e => update("voiceSensitivity", Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Language
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Speech recognition language preference.
            </p>
            <select
              className="border p-3 rounded-lg w-full"
              value={form.language}
              onChange={e => update("language", e.target.value)}
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Theme
            </label>
            <p className="text-xs text-gray-500 mb-1">
              Default dashboard theme preference.
            </p>
            <select
              className="border p-3 rounded-lg w-full"
              value={form.theme}
              onChange={e => update("theme", e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

        </div>

      </div>

      <button
        onClick={saveSettings}
        className="bg-black text-white px-8 py-3 rounded-xl font-semibold"
      >
        Save Settings
      </button>

    </div>

  )

}