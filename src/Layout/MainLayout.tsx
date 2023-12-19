import { Footer, Header } from "@/Components";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="relative dark:bg-dark-theme-primary dark:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { MainLayout };
