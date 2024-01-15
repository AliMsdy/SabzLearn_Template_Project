import { useState } from "react";
//components
import { Sidebar, TopBar } from "@/Components/AdminPanel";
import { Outlet } from "react-router-dom";

function AdminPanelLayout() {
  const [toggleCollapse, setToggleCollapse] = useState(false);

  return (
    <div
      className={`grid h-screen  grid-rows-[60px_1fr] transition-all duration-500 ${
        toggleCollapse ? "grid-cols-[50px_1fr]" : "grid-cols-[200px_1fr] font-vazir"
      }`}
    >
      <Sidebar
        toggleCollapse={toggleCollapse}
        setToggleCollapse={setToggleCollapse}
      />
      <TopBar />
      <main className="col-start-2 bg-yellow-500">
        <Outlet />
      </main>
    </div>
  );
}

export { AdminPanelLayout };
