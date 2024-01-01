import Logo from "/images/logo/Logo.png";
import { useAuthContext } from "@/context/AuthContext";
import darkModeHandler from "@/utils/darkmodeHandler";
import { useState } from "react";
import { Link } from "react-router-dom";

//component
import { Button, NavigationSection, Overlay } from "..";

//icon
import { FaSearch } from "react-icons/fa";
import {  FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";



function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const { isLoggedIn, userInfos } = useAuthContext();
  
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
          <Button onClick={() => darkModeHandler()} className="px-2">
            <FaSearch size={25} />
          </Button>
          <Button
            component="link"
            to="/#"
            className="bg-gray-color px-2 text-dark-color"
          >
            <FaCartShopping size={25} />
          </Button>
          {isLoggedIn ? (
            <Button
              variant="unfilled"
              component="link"
              to="/#"
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
