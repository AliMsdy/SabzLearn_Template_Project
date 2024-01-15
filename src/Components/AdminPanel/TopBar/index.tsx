//icons
import { FaRegBell } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

function TopBar() {
  return (
    <header className="flex items-center justify-between p-2 py-4 lg:px-6">
      <div className="flex items-center gap-5">
        <form>
          <input
            type="text"
            placeholder="جستجو..."
            className="rounded-md bg-[#eef5fd] p-2 focus:outline-none placeholder:text-sm"
          />
          {/* <Input placeholder="جستجو..." /> */}
        </form>
        <FaRegBell size={20} className="cursor-pointer text-[#a3abb1]" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <FaAngleDown />
          <span className="text-sm">محمد امین سعیدی راد</span>
        </div>
        <img
          src="/images/profilePic.jfif"
          className="h-12 w-12 cursor-pointer rounded-full"
          alt="profile-pic"
        />
      </div>
    </header>
  );
}

export { TopBar };
