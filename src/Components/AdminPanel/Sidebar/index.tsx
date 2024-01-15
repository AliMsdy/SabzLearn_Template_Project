import { NavLink } from "react-router-dom";
//icons
import {
  FaCartPlus,
  FaChartBar,
  FaChartLine,
  FaCommentAlt,
  FaEnvelope,
  FaExclamationCircle,
  FaHome,
  FaShoppingCart,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

//types
import { SetState } from "@/types/shared";
type SidebarProps = {
  toggleCollapse: boolean;
  setToggleCollapse: SetState<boolean>;
};
//list
const sideBarLinks = [
  { title: "داشبورد", Icon: FaHome, link: "" },
  { title: "فروش", Icon: FaChartLine, link: "sales" },
  { title: "کاربران", Icon: FaUsers, link: "users" },
  { title: "افزودن کاربر جدید", Icon: FaUserPlus, link: "add-user" },
  { title: "محصولات", Icon: FaShoppingCart, link: "products" },
  { title: "افزودن محصول جدید", Icon: FaCartPlus, link: "add-product" },
  { title: "گزارش ها", Icon: FaChartBar, link: "reports" },
  { title: "ایمیل", Icon: FaEnvelope, link: "emails" },
  { title: "پیام ها", Icon: FaCommentAlt, link: "messages" },
  { title: "گزارش", Icon: FaExclamationCircle, link: "report" },
];

function Sidebar({ toggleCollapse, setToggleCollapse }: SidebarProps) {
  return (
    <aside className="row-span-2 bg-[#17203f]  text-white ">
      <div
        className={`flex items-center border-b border-solid border-[#838383] p-2 ${
          toggleCollapse ? "justify-center py-4" : "mt-4 justify-between pb-2"
        }`}
      >
        {!toggleCollapse && (
          <img
            className="max-w-[80px]"
            src="/images/logo/Logo.png"
            alt="logo-picture"
          />
        )}
        <MdKeyboardDoubleArrowRight
          className={`cursor-pointer transition-all duration-500 ${
            toggleCollapse && "rotate-180"
          }`}
          onClick={() => setToggleCollapse(!toggleCollapse)}
          size={30}
        />
      </div>

      <div className="mt-12 ">
        {sideBarLinks.map(({ title, link, Icon }) => (
          <NavLink
            to={`admin-panel/${link}`}
            end
            className={({ isActive }) =>
              `hover:bg-sidebar-links-background relative flex items-center gap-4 py-3 text-sm text-[#8c90a0] hover:text-white ${
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
    </aside>
  );
}

export { Sidebar };
