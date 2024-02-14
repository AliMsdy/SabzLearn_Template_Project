import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//icons
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { FaHome, FaListAlt, FaUsers } from "react-icons/fa";
import { FaComments, FaMessage } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import {
  MdArticle,
  MdDiscount,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { PiVideoFill } from "react-icons/pi";
import { RiMacbookLine } from "react-icons/ri";

//types
import { useAuthContext } from "@/context/AuthContext";
import { SetState } from "@/types/shared";

//components
import { AlertDialog } from "..";
//utils
import { cn } from "@/lib/utils";
//types
type SidebarProps = {
  toggleCollapse: boolean;
  setToggleCollapse: SetState<boolean>;
};
//adminPanelLinks
const sideBarLinks = [
  { title: "داشبورد", Icon: FaHome, link: "" },
  { title: "دوره ها", Icon: RiMacbookLine, link: "/courses" },
  { title: "کاربران", Icon: FaUsers, link: "/users" },
  { title: "پیام ها", Icon: FaMessage, link: "/contacts" },
  { title: "مقالات", Icon: MdArticle, link: "/articles" },
  { title: "جلسات", Icon: PiVideoFill, link: "/sessions" },
  { title: "منوها", Icon: BsFillMenuButtonWideFill, link: "/menus" },
  { title: "کامنت ها", Icon: FaComments, link: "/comments" },
  { title: "دسته بندی ها", Icon: FaListAlt, link: "/categories" },
  { title: "کد های تخفیف", Icon: MdDiscount, link: "/discounts" },
];

function Sidebar({ toggleCollapse, setToggleCollapse }: SidebarProps) {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const logoutHandler = () => {
    toast.success("با موفقیت از حساب کاربری خود خارج شدید");
    logout();
    navigate("/");
  };
  return (
    <aside className="row-span-2 flex flex-col overflow-y-auto bg-[#17203f] text-white">
      <div
        className={`flex items-center border-b border-solid border-[#838383] p-2 ${
          toggleCollapse ? "justify-center py-4" : "mt-4 justify-between pb-2"
        }`}
      >
        {!toggleCollapse && (
          <Link to="/admin-panel">
            <img
              className="max-w-[80px]"
              src="/images/logo/Logo.png"
              alt="logo-picture"
            />
          </Link>
        )}
        <MdKeyboardDoubleArrowRight
          className={`cursor-pointer transition-all duration-500 ${
            toggleCollapse && "rotate-180"
          }`}
          onClick={() => setToggleCollapse(!toggleCollapse)}
          size={30}
        />
      </div>

      <div className="mt-12">
        {sideBarLinks.map(({ title, link, Icon }) => (
          <NavLink
            to={`admin-panel${link}`}
            end
            className={({ isActive }) =>
              cn(
                "relative flex items-center gap-4 py-3 pr-3 text-sm text-[#8c90a0] hover:bg-sidebar-links-background hover:text-white",
                {
                  "bg-sidebar-links-background text-white after:absolute after:left-0 after:top-0 after:h-full after:w-1.5 after:rounded-md after:bg-[#4869ff]":
                    isActive,
                },
              )
            }
            key={title}
          >
            <Icon size={20} />
            {!toggleCollapse && <span>{title}</span>}
          </NavLink>
        ))}
      </div>
      <AlertDialog
        message="آیا مطمئن هستید که خارج شوید؟"
        clickHandler={logoutHandler}
        AlertTrigger={
          <div className="mt-auto flex cursor-pointer items-center gap-4 py-3 pr-3 text-sm text-[#8c90a0] hover:bg-sidebar-links-background hover:text-white">
            <HiOutlineLogout size={20} />
            {!toggleCollapse && <span>خروج</span>}
          </div>
        }
      />
    </aside>
  );
}
export { Sidebar };
