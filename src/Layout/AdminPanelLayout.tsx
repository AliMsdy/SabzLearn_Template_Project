import { Outlet } from "react-router-dom"
import { Sidebar,TopBar } from "@/Components/AdminPanel"

function AdminPanelLayout() {
  return (
    <div>
      <TopBar />
      <Sidebar />
      <Outlet />
    </div>
  )
}

export { AdminPanelLayout }