import { Link, NavLink } from "react-router-dom";
//component
import { NavItem } from "..";

//icon
import { FaAngleDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

//type
import { LinkType, SetState } from "@/types/shared";
//api
import { useQueryCall } from "@/hooks";

type NavagationSectionProps = {
  sidebar: boolean;
  setSidebar: SetState<boolean>;
};
function NavigationSection({ sidebar, setSidebar }: NavagationSectionProps) {
  const { data: navLinks = [] } = useQueryCall(["AllMenus"], {
    url: "/menus",
  });
  const navLinksModified = navLinks.length
    ? [{ title: "صفحه اصلی", href: "/", submenus: [] }, ...navLinks]
    : [];
  return (
    <>
      {/* MOBILE NAVIGATION MENU START */}
      <nav
        className={`fixed bottom-0 right-0 top-0 z-20 w-[70vw] overflow-y-auto bg-gray-800  p-4 transition-all duration-500 sm:w-[40-vw] md:w-[30vw] lg:hidden ${
          !sidebar && "translate-x-[1000px]"
        }`}
      >
        <ul className="mt-8 flex flex-col gap-y-4">
          {navLinksModified.map((link: LinkType) => {
            return (
              <NavItem key={link.title} setSidebar={setSidebar} {...link} />
            );
          })}
        </ul>
        <button
          onClick={() => setSidebar(false)}
          className="absolute left-2 top-1 text-white"
        >
          <IoClose size={35} />
        </button>
      </nav>
      {/* MOBILE NAVIGATION MENU END */}
      {/* LARGE SCREEN NAVIGATION MENU START */}
      <nav className="mr-4 hidden lg:block">
        <ul className="flex gap-3">
          {navLinksModified.map(({ title, href, submenus }: LinkType) => {
            const hasSubmenus = !!submenus.length;
            return (
              <li className="relative " key={title}>
                <NavLink
                  to={href === "/" ? href : `/category-info/${href}`}
                  className={({ isActive }) =>
                    `peer flex cursor-pointer items-center gap-x-1  hover:text-[#1e83f0]  dark:hover:text-[#1e83f0] ${
                      isActive
                        ? "text-[#1e83f0]"
                        : "text-[#7f8187] dark:text-white"
                    }`
                  }
                >
                  {title}
                  {hasSubmenus && <FaAngleDown />}
                </NavLink>
                {hasSubmenus && (
                  <ul className=" invisible absolute z-10 mt-2 min-w-[240px] translate-y-0 rounded-lg  border-b-4 border-solid border-primary-color bg-white p-4  opacity-0 shadow-lg transition-all duration-[400ms] hover:visible hover:translate-y-1 hover:opacity-100 peer-hover:visible peer-hover:translate-y-1 peer-hover:opacity-100 dark:bg-dark-theme-secondary">
                    {submenus.map(({ title, href }: LinkType) => (
                      <li className="my-3 last:mb-1" key={title}>
                        <Link to={href}>{title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* LARGE SCREEN NAVIGATION MENU END */}
    </>
  );
}

export { NavigationSection };
