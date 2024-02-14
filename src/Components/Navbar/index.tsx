import { useAuthContext } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";

import darkModeHandler from "@/utils/darkmodeHandler";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/images/logo/Logo.png";

//component
import { Button, NavigationSection, Overlay } from "..";

//icon
import { FaUserLarge } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { RiAccountBoxLine, RiAdminFill } from "react-icons/ri";

function Navbar() {
  const { theme, setTheme } = useThemeContext();
  const { isLoggedIn, userInfos } = useAuthContext();
  const [sidebar, setSidebar] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <section className=" mb-8  flex items-center justify-between px-3 lg:justify-normal lg:px-0 ">
      {/* HUMBERGER MENU START */}
      <button className="lg:hidden" onClick={() => setSidebar(true)}>
        <HiMenu size={35} />
      </button>
      {/* HUMBERGER MENU END */}

      {/* SABZLEARN LOGO */}
      <Link
        to="/#"
        className="absolute  left-[50%] translate-x-[-50%] lg:static lg:mr-2 lg:translate-x-0"
      >
        <img src={Logo} alt="sabzlearn-logo" />
      </Link>
      {/* SABZLEARN LOGO END */}

      {/* NAV START */}
      <NavigationSection sidebar={sidebar} setSidebar={setSidebar} />
      {/* NAV END */}

      {/* USER SECTION START */}
      <div
        className={`relative flex flex-col items-end lg:mr-auto ${
          !sidebar && "z-30"
        }`}
      >
        <Button
          onClick={() => setShowUserInfo(true)}
          className={`absolute top-[50%] translate-y-[-50%] rounded-full bg-[#c5c5c5] p-4 lg:hidden`}
        >
          <FaUserLarge size={30} />
        </Button>

        <div
          className={` absolute flex-col-reverse gap-x-4 rounded-md bg-white p-4 dark:bg-dark-theme-secondary lg:static lg:ml-4 lg:mr-auto lg:flex lg:flex-row lg:rounded-none lg:bg-transparent lg:p-0 dark:lg:bg-transparent ${
            showUserInfo
              ? " flex min-w-[200px] translate-y-[20%] gap-y-2"
              : "hidden"
          }`}
        >
          <Button onClick={() => setTheme(darkModeHandler())} className="px-2">
            {theme === "light" ? (
              <IoMoonOutline size={25} />
            ) : (
              <IoSunnyOutline size={25} />
            )}
          </Button>
          {isLoggedIn ? (
            userInfos?.role === "ADMIN" ? (
              <Button
                component="link"
                to="/admin-panel"
                className="bg-gray-color px-2 text-dark-color"
              >
                <RiAdminFill size={25} />
              </Button>
            ) : (
              <Button
                component="link"
                to="/my-account"
                className="bg-gray-color px-2 text-dark-color"
              >
                <RiAccountBoxLine size={25} />
              </Button>
            )
          ) : null}

          {isLoggedIn ? (
            <Button
              variant="unfilled"
              component="link"
              to={`${
                userInfos?.role === "ADMIN" ? "/admin-panel" : "/my-account"
              }`}
              className="px-0 lg:px-4"
            >
              {userInfos?.name}
            </Button>
          ) : (
            <Button
              component="link"
              variant="unfilled"
              className="px-0 lg:px-4"
              to="/login"
            >
              ورود / ثبت نام
            </Button>
          )}
        </div>
      </div>
      {/* USER SECTION END */}

      {/* BACKGROUND OVERLAY */}
      <Overlay showOverlay={sidebar} setStateFunc={setSidebar} />
      <Overlay showOverlay={showUserInfo} setStateFunc={setShowUserInfo} />
    </section>
  );
}

export { Navbar };
