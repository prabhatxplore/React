import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {

  return (
    <div className=" h-screen flex flex-col">
      <Navbar />
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default App
