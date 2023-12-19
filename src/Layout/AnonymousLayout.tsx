import { Navbar,Footer } from "@/Components";
import { Outlet } from "react-router-dom";

function AnonymousLayout() {
  return (
    <div className="relative  dark:bg-dark-theme-primary dark:text-white pt-6">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { AnonymousLayout };
