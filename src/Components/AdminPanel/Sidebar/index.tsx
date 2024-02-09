import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//icons
import { FaHome, FaListAlt, FaUsers } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { MdArticle, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiMacbookLine } from "react-icons/ri";
import { PiVideoFill } from "react-icons/pi";

//types
import { useAuthContext } from "@/context/AuthContext";
import { SetState } from "@/types/shared";

//components
type SidebarProps = {
  toggleCollapse: boolean;
  setToggleCollapse: SetState<boolean>;
};
//adminPanelLinks
const sideBarLinks = [
  { title: "داشبورد", Icon: FaHome, link: "" },
  // { title: "فروش", Icon: FaChartLine, link: "/sales" },
  { title: "دوره ها", Icon: RiMacbookLine, link: "/courses" },
  { title: "کاربران", Icon: FaUsers, link: "/users" },
  { title: "پیام ها", Icon: FaMessage, link: "/contacts" },
  { title: "مقالات", Icon: MdArticle, link: "/articles" },
  { title: "جلسات", Icon: PiVideoFill, link: "/sessions" },
  // { title: "افزودن کاربر جدید", Icon: FaUserPlus, link: "/add-user" },
  // { title: "محصولات", Icon: FaShoppingCart, link: "/products" },
  // { title: "افزودن محصول جدید", Icon: FaCartPlus, link: "/add-product" },
  // { title: "گزارش ها", Icon: FaChartBar, link: "/reports" },
  // { title: "ایمیل", Icon: FaEnvelope, link: "/emails" },
  // { title: "پیام ها", Icon: FaCommentAlt, link: "/messages" },
  // { title: "گزارش", Icon: FaExclamationCircle, link: "/report" },
  { title: "دسته بندی ها", Icon: FaListAlt, link: "/categories" },
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
              `relative flex items-center gap-4 py-3 pr-3 text-sm text-[#8c90a0] hover:bg-sidebar-links-background hover:text-white ${
                isActive
                  ? "bg-sidebar-links-background text-white after:absolute after:left-0 after:top-0 after:h-full after:w-1.5 after:rounded-md after:bg-[#4869ff]"
                  : ""
              }`
            }
            key={title}
          >
            <Icon size={20} />
            {!toggleCollapse && <span>{title}</span>}
          </NavLink>
        ))}
      </div>
      <div
        className="mt-auto flex cursor-pointer items-center gap-4 py-3 pr-3 text-sm text-[#8c90a0] hover:bg-sidebar-links-background hover:text-white"
        onClick={logoutHandler}
      >
        <HiOutlineLogout size={20} />
        {!toggleCollapse && <span>خروج</span>}
      </div>
    </aside>
  );
}
//onClick={logoutHandler}
export { Sidebar };
