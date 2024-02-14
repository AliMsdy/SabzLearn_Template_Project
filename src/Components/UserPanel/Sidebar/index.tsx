import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//utils
import { cn } from "@/lib/utils";

//components
import { AlertDialog } from "@/Components/AdminPanel";

//context
import { useAuthContext } from "@/context/AuthContext";

//icons
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

//userPanelLinks
import { userPanelLinks } from "@/shared/Lists";

function Sidebar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(() =>
    window.innerWidth >= 640 ? true : false,
  );
  const contentRef = useRef<HTMLUListElement | null>(null);
  const logoutHandler = () => {
    toast.success("با موفقیت از حساب کاربری خود خارج شدید");
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="mb-4 flex justify-center sm:hidden">
        {collapse ? (
          <IoIosArrowUp size={35} onClick={() => setCollapse(!collapse)} />
        ) : (
          <IoIosArrowDown size={35} onClick={() => setCollapse(!collapse)} />
        )}
      </div>
      <ul
        className="transition-max-height overflow-hidden border-b-2 border-solid border-gray-500 duration-500 sm:border-b-0 sm:border-l-2 sm:pl-6"
        ref={contentRef}
        style={{
          maxHeight: collapse ? contentRef.current?.scrollHeight : "0",
        }}
      >
        {userPanelLinks.map(({ title, href }) => (
          <NavLink
            to={`my-account${href}`}
            end
            className={({ isActive }) =>
              cn(
                "mb-2 flex rounded-md p-3 dark:hover:bg-sidebar-links-background dark:hover:text-white",
                {
                  "bg-[#c1c1c8] text-black dark:bg-sidebar-links-background dark:text-white":
                    isActive,
                },
              )
            }
            key={title}
          >
            {title}
          </NavLink>
        ))}
        <AlertDialog
          message="آیا مطمئن هستید که خارج شوید؟"
          clickHandler={logoutHandler}
          AlertTrigger={
            <Link
              to="#"
              className="mb-2 flex cursor-pointer rounded-md p-3 dark:hover:bg-sidebar-links-background dark:hover:text-white"
            >
              خروج از سیستم
            </Link>
          }
        />
      </ul>
    </>
  );
}

export { Sidebar };
