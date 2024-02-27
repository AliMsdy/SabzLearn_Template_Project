import { useState } from "react";
//icons
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
//context
import { useAuthContext } from "@/context/AuthContext";
import { useThemeContext } from "@/context/ThemeContext";
//components
import { Button, Overlay } from "@/Components";
//api
import { useMutateCall } from "@/hooks";
//utils
import darkModeHandler from "@/utils/darkmodeHandler";

function TopBar() {
  const { theme, setTheme } = useThemeContext();
  const { userInfos, token, login } = useAuthContext();
  const [showNotifs, setShowNotifs] = useState(false);
  const { mutateAsync: seeNotificationHandler } = useMutateCall([
    "seeNotification",
  ]);

  const isNotificationExist = !!userInfos?.notifications.length;

  const seeNotification = async (_id: string) => {
    await seeNotificationHandler({
      url: `/notifications/see/${_id}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    login(token);
    // close the overlay if there is not notification
    if (+userInfos!.notifications.length === 1) setShowNotifs(false);
  };

  return (
    <header className="dark:bg-admin-topBar-dark-color flex items-center justify-between p-2 py-4 dark:text-white lg:px-6">
      <div className="hidden items-center gap-5 sm:flex">
        <form>
          <input
            type="text"
            placeholder="جستجو..."
            className="rounded-md bg-[#eef5fd] p-2 placeholder:text-sm focus:outline-none"
          />
        </form>
        <span
          className={`relative ${
            isNotificationExist
              ? "after:absolute after:-right-[3px] after:-top-[1.5px] after:h-2 after:w-2 after:rounded-full after:bg-red-500"
              : ""
          }`}
        >
          <FaRegBell
            size={20}
            onClick={() => setShowNotifs(!showNotifs)}
            className="cursor-pointer text-[#a3abb1]"
          />
          <ul
            className={`absolute right-1/2 z-20 mt-1 w-max translate-x-1/2 rounded-md bg-gray-color dark:bg-dark-theme-secondary p-1 opacity-0 transition-all duration-500 ${
              showNotifs && "opacity-100"
            }`}
          >
            {isNotificationExist ? (
              showNotifs &&
              userInfos?.notifications.map(({ msg, _id }) => (
                <li
                  key={_id}
                  className="mb-2 flex items-center justify-between gap-3 p-2 text-sm"
                >
                  <span>{msg}</span>
                  <Button
                    className="p-2 py-1"
                    variant="unfilled"
                    onClick={() => seeNotification(_id)}
                  >
                    دیدم
                  </Button>
                </li>
              ))
            ) : (
              <li className="p-2 text-sm">نوتیفیکیشنی وجود ندارد</li>
            )}
          </ul>
        </span>
        <Button
          onClick={() => setTheme(darkModeHandler())}
          className="bg-transparent px-2"
        >
          {theme === "light" ? (
            <IoMoonOutline className="text-[#a3abb1]" size={25} />
          ) : (
            <IoSunnyOutline className="text-[#a3abb1]" size={25} />
          )}
        </Button>
      </div>
      <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
        <div className="flex items-center gap-1">
          <FaAngleDown />
          <span className="text-sm">{userInfos?.name}</span>
        </div>
        <img
          src={`/images/${userInfos?.profile}`}
          className="h-12 w-12 cursor-pointer rounded-full"
          alt="profile-pic"
        />
      </div>
      <Overlay showOverlay={showNotifs} setStateFunc={setShowNotifs} />
    </header>
  );
}

export { TopBar };
