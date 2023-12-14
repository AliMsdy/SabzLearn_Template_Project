import Logo from "@/assets/images/logo/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Overlay } from "..";

//icon
import { FaSearch } from "react-icons/fa";
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";
import { HiMenu } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const navLink = [
  { title: "صفحه اصلی", children: [], path: "/" },
  {
    title: "فرانت اند",
    children: [
      { title: "آموزش Html", path: "/html-course" },
      { title: "آموزش Css", path: "/css/course" },
      { title: "آموزش جاوااسکریپت", path: "/#" },
      { title: "آموزش FlexBox", path: "/#" },
      { title: "آموزش جامع ریکت", path: "/#" },
    ],
  },
  {
    title: "امنیت",
    children: [
      { title: "آموزش کالی لینوکس", path: "/#" },
      { title: "آموزش پایتون سیاه", path: "/#" },
      { title: "آموزش جاوااسکریپت سیاه", path: "/#" },
      { title: "آموزش شبکه", path: "/#" },
    ],
  },
  {
    title: "مقالات",
    children: [
      { title: "توسعه وب ", path: "/#" },
      { title: "جاوااسکریپت", path: "/#" },
      { title: "فرانت اند", path: "/#" },
    ],
  },
  {
    title: "پایتون",
    children: [
      { title: "دوره متخصص پایتون", path: "/#" },
      { title: "دوره هوش مصنوعی با پایتون", path: "/#" },
      { title: "دوره متخصص جنگو", path: "/#" },
    ],
  },
  { title: "مهارت های نرم", children: [], path: "/#" },
];

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  return (
      <section className=" flex items-center justify-between px-3 lg:justify-normal lg:px-0 mb-8 ">
      <button className=" lg:hidden" onClick={() => setSidebar(true)}>
        <HiMenu size={35} />
      </button>
      <Link
        to="/#"
        className="absolute  left-[50%] translate-x-[-50%] lg:static lg:mr-2 lg:translate-x-0"
      >
        <img src={Logo} alt="sabzlearn-logo" />
      </Link>
      <nav
        className={`absolute right-0 top-0 z-20 h-screen w-[50vw] bg-gray-800 p-6 transition-all duration-500 sm:w-[40vw]  md:w-[30vw] lg:static lg:mr-4 lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent lg:p-0 ${
          !sidebar && "translate-x-[1000px]"
        }`}
      >
        <ul className="mt-6 flex flex-col gap-y-8 lg:mt-0 lg:flex-row lg:gap-3">
          {navLink.map(({ title, path, children }) => {
            if (children.length) {
              return (
                <li
                  className="relative text-white lg:text-[#7f8187]"
                  key={title}
                >
                  <span className="peer flex cursor-pointer items-center gap-x-1">
                    <span>{title}</span>
                    <IoIosArrowDown />
                  </span>
                  <ul className=" invisible absolute z-10 min-w-[240px] translate-y-0 rounded-lg border-b-4  border-solid border-primary-color bg-white p-4  opacity-0 shadow-lg transition-all duration-[400ms] hover:visible hover:translate-y-1 hover:opacity-100 peer-hover:visible peer-hover:translate-y-1 peer-hover:opacity-100">
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
                    className="text-white lg:text-[#7f8187]"
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
      <div
        className={`relative flex flex-col items-end lg:mr-auto ${
          !sidebar && "z-30"
        }`}
      >
        <button
          onClick={() => setShowUserInfo(true)}
          className={`absolute  top-[50%] translate-y-[-50%] rounded-full bg-[#c5c5c5] p-4 text-center text-white lg:hidden`}
        >
          <FaUserLarge size={30} />
        </button>

        <div
          className={` absolute flex-col-reverse gap-x-4 rounded-md bg-white p-4 lg:static lg:ml-4 lg:mr-auto lg:flex lg:flex-row lg:rounded-none lg:bg-transparent lg:p-0 ${
            showUserInfo
              ? " flex min-w-[200px] translate-y-[20%] gap-y-2"
              : "hidden"
          }`}
        >
          <Link to="/#">
            <button className="flex w-full justify-center rounded-md bg-primary-color p-2 text-white">
              <FaSearch size={25} />
            </button>
          </Link>
          <Link to="/#">
            <button className="flex w-full justify-center rounded-md bg-[#f0f2f7] p-2 text-dark-color">
              <FaCartShopping size={25} />
            </button>
          </Link>

          <Link
            to="/#"
            className=" rounded-md border-2 border-solid border-primary-color p-2 text-primary-color transition-all duration-300 hover:bg-primary-color hover:text-white"
          >
            محمد امین سعیدی راد
          </Link>
        </div>
      </div>

      {/* BACKGROUND OVERLAY */}
      <Overlay showOverlay={sidebar} setStateFunc={setSidebar} />
      <Overlay showOverlay={showUserInfo} setStateFunc={setShowUserInfo} />
    </section>
  );
}

export { Navbar };
