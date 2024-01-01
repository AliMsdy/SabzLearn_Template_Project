import { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

//type
import { LinkType, SetState } from "@/types/shared";

type NavItemProps = LinkType & {
  setSidebar: SetState<boolean>;
};

function NavItem({ title, href, submenus, setSidebar }: NavItemProps) {
  const [open, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLUListElement | null>(null);
  const hasSubMenus = !!submenus.length;
  return (
    <li key={title} className="justify-center text-white" onClick={() => setIsOpen(!open)} >
      {hasSubMenus ? (
        <div className="flex items-center justify-between rounded-md bg-dark-theme-secondary p-2">
          {title}
          <FaAngleDown
            className={`transition-all duration-500 ${
              open && "rotate-180 text-[#0c63e4]"
            }`}
            size={20}
          />
        </div>
      ) : (
        <Link
          onClick={() => setSidebar(false)}
          to={href}
          className="block rounded-md bg-dark-theme-secondary p-2"
        >
          {title}
        </Link>
      )}
      {hasSubMenus && (
        <ul
          ref={contentRef}
          className="mt-1 overflow-hidden pt-1 transition-all duration-500"
          style={{
            maxHeight: open ? contentRef.current?.scrollHeight : "0",
          }}
        >
          {submenus.map(({ title, href }) => (
            <li key={title} className="py-2">
              <Link
                onClick={() => setSidebar(false)}
                to={href}
                className="text-white hover:text-[#1e83f0] lg:text-[#7f8187] lg:dark:text-white"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export { NavItem };
