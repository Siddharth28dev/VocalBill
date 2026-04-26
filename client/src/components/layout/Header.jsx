import ThemeToggle from "../ui/ThemeToggle"

export default function Header() {

  return (

    <div className="flex justify-between items-center px-6 py-4 border-b dark:border-gray-800">

      <h1 className="text-lg font-semibold">
        Voice POS System
      </h1>

      <ThemeToggle/>

    </div>

  )

}