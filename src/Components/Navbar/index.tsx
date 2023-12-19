import Logo from "@/assets/images/logo/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import darkModeHandler from "@/utils/darkmodeHandler";
//component
import { Button, Overlay } from "..";

//icon
import { FaSearch } from "react-icons/fa";
import { FaAngleDown, FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

//list 
import { navLinks } from "@/shared/Lists";

function Navbar() {
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
      <nav
        className={`fixed right-0 top-0 bottom-0 z-20 w-[50vw] bg-gray-800 p-6 transition-all duration-500 sm:w-[40vw]  md:w-[30vw] lg:static lg:mr-4 lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent lg:p-0 ${
          !sidebar && "translate-x-[1000px]"
        }`}
      >
        <ul className="mt-6 flex flex-col gap-y-8 lg:mt-0 lg:flex-row lg:gap-3">
          {navLinks.map(({ title, path, children }) => {
            if (children.length) {
              return (
                <li
                  className="relative text-white lg:text-[#7f8187] lg:dark:text-white"
                  key={title}
                >
                  <span className="peer flex cursor-pointer items-center gap-x-1">
                    <span>{title}</span>
                    <FaAngleDown />
                  </span>
                  <ul className=" invisible absolute z-10 min-w-[240px] translate-y-0 rounded-lg border-b-4  border-solid border-primary-color bg-white dark:bg-dark-theme-secondary p-4  opacity-0 shadow-lg transition-all duration-[400ms] hover:visible hover:translate-y-1 hover:opacity-100 peer-hover:visible peer-hover:translate-y-1 peer-hover:opacity-100">
                    {children.map(({ title, path }) => (
                      <li className="my-3 last:mb-1" key={title}>
                        <Link onClick={() => setSidebar(false)} to={path}>
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            } else {
              return (
                <li key={title}>
                  <Link
                    onClick={() => setSidebar(false)}
                    className="text-white lg:text-[#7f8187] lg:dark:text-white"
                    to={path!}
                  >
                    {title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
        <button
          onClick={() => setSidebar(false)}
          className="absolute left-2 top-4 text-white lg:hidden"
        >
          <IoClose size={35} />
        </button>
      </nav>
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
          className={` absolute flex-col-reverse gap-x-4 rounded-md bg-white p-4 lg:static lg:ml-4 lg:mr-auto lg:flex lg:flex-row lg:rounded-none lg:bg-transparent lg:p-0 dark:bg-dark-theme-secondary dark:lg:bg-transparent ${
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
          <Button
            variant="unfilled"
            component="link"
            to="/#"
            className="px-0 lg:px-4"
          >
            محمد امین سعیدی راد
          </Button>
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
