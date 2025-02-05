
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import SidebarNav from "../Navigation/SidebarNav"
import NavBar from "../Navigation/NavBar"
import { Outlet } from "react-router-dom"

function Admin() {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>

        <div className="flex flex-1 flex-col">
          <div className="border-b p-2">
            <NavBar />
          </div>
          <div className="m-5">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Admin