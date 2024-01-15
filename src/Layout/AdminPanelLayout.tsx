import { useState } from "react";
//components
import { Sidebar, TopBar } from "@/Components/AdminPanel";
import { Outlet } from "react-router-dom";

function AdminPanelLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  return (
    <div
      className={`grid h-screen  grid-rows-[80px_1fr] transition-all duration-500 font-vazir ${
        toggleCollapse ? "grid-cols-[50px_1fr]" : "grid-cols-[200px_1fr] "
      }`}
    >
      <Sidebar
        toggleCollapse={toggleCollapse}
        setToggleCollapse={setToggleCollapse}
      />
      <TopBar />
      <main className="col-start-2 bg-[#f9faff] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export { AdminPanelLayout };
