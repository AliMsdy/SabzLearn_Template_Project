import { useState } from "react";
//components
import { Sidebar, TopBar } from "@/Components/AdminPanel";
import { Outlet } from "react-router-dom";

function AdminPanelLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  return (
    <div
      className={`relative grid  h-screen grid-rows-[80px_1fr] overflow-hidden font-vazir transition-all duration-500 ${
        toggleCollapse ? "grid-cols-[50px_1fr]" : "grid-cols-[200px_1fr] "
      }`}
    >
      <Sidebar
        toggleCollapse={toggleCollapse}
        setToggleCollapse={setToggleCollapse}
      />
      <TopBar />
      <main className="col-start-2 overflow-y-auto bg-[#f9faff] p-4">
        <Outlet />
      </main>
    </div>
  );
}

export { AdminPanelLayout };
