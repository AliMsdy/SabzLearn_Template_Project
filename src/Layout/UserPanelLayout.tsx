import { Outlet, useLocation } from "react-router-dom";
//components
import { Footer, Navbar } from "@/Components";
import { Sidebar } from "@/Components/UserPanel";

//userPanelLinks
import { userPanelLinks } from "@/shared/Lists";

function UserPanelLayout() {
  const location = useLocation();
  return (
    <div className="relative font-iranSanse dark:bg-dark-theme-primary dark:text-white">
      <header className="pt-8">
        <Navbar />
      </header>
      <div className="mx-auto my-6 border-y-2 border-solid border-primary-color px-12 py-4 sm:px-20 md:px-32">
        <h2 className="mb-4 text-2xl">حساب کاربری من</h2>
        <p>
          {
            userPanelLinks
              .map((item) => ({ ...item, href: `/my-account${item.href}` }))
              .find((item) => item.href === location.pathname)?.title
          }
        </p>
      </div>
      <main className="custom-container grid grid-cols-12 p-0 ">
        <div className="col-span-12 sm:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-12 p-4 sm:col-span-9">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { UserPanelLayout };
