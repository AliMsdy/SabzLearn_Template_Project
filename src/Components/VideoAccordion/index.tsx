import { useRef, useState } from "react";
import { Link } from "react-router-dom";

//icon
import { FaAngleDown, FaYoutube } from "react-icons/fa6";

function VideoAccordion({
  isOpen,
  sessions,
}: {
  isOpen?: boolean;
  sessions: [];
}) {
  const [open, setIsOpen] = useState(isOpen || false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className=" mt-4  rounded-md border-2 border-solid border-gray-300 bg-[#f7f9fa] dark:bg-dark-theme-secondary">
      {/* TOP SECTION START */}
      <div
        onClick={() => setIsOpen(!open)}
        className={`flex cursor-pointer items-center justify-between rounded-md p-4 ${
          open && "shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)]"
        }`}
      >
        <h3 className={`text-sm sm:text-base ${open && "text-[#0c63e4]"}`}>
          افزایش درآمد از ری‌اکت به کمک مهارت شبکه سازی (آپدیت دوره)
        </h3>
        <FaAngleDown
          className={`transition-all duration-500 ${
            open && "rotate-180 text-[#0c63e4]"
          }`}
          size={20}
        />
      </div>
      {/* TOP SECTION END */}

      {/* BODY SECTION START */}
      <div
        ref={contentRef}
        className="transition-max-height overflow-hidden duration-500"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight : "0",
        }}
      >
        {sessions.map(({ title, time, _id },index) => (
          <div
            key={_id}
            className="flex items-center border-t-2 border-solid border-gray-300 p-4 "
          >
            <div className="flex flex-grow items-center gap-x-2 sm:gap-x-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-solid border-gray-500 p-1 text-[#656464] dark:border-white dark:text-white">
                {index + 1}
              </span>
              <FaYoutube className="text-7xl text-[#939aa3] dark:text-white sm:text-4xl" />
              <Link to="/#">{title}</Link>
            </div>
            <span className="text-[#7a7a7a] dark:text-white">{time}</span>
          </div>
        ))}
      </div>
      {/* BODY SECTION END */}
    </div>
  );
}

export { VideoAccordion };
// useEffect(() => {
//   if (open) {
//     // If the accordion item is active, set max-height to the actual content height
//     contentRef.current!.style.maxHeight = `${
//       contentRef.current!.scrollHeight
//     }px`;
//   } else {
//     contentRef.current!.style.maxHeight = "0";
//   }
// }, [open]);
