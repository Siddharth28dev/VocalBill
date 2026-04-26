import { useEffect } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import api from "../../api/axios"

export default function Layout({ children }) {

  useEffect(() => {

    const loadTheme = async () => {

      try {

        const res = await api.get("/settings")

        const theme = res.data.theme || "light"

        if (theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }

      } catch (err) {
        console.error(err)
      }

    }

    loadTheme()

  }, [])

  return (

    <div className="flex">

      <Sidebar/>

      <div className="flex-1 min-h-screen">

        <Header/>

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>

  )

}