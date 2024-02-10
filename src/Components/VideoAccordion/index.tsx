import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

//icon
import { FaAngleDown, FaLock, FaYoutube } from "react-icons/fa6";

function VideoAccordion({
  isOpen,
  sessions,
  isUserRegistered,
}: {
  isOpen?: boolean;
  sessions: [];
  isUserRegistered: boolean;
}) {
  const { courseName } = useParams();
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
          {sessions.map(({ title, time, _id, free }, index) => (
            <div
              key={_id}
              className="flex items-center border-t-2 border-solid border-gray-300 p-2 sm:p-4"
            >
              <div className="flex flex-grow items-center gap-x-2 sm:gap-x-5">
                <span className="flex items-center justify-center rounded-full border border-solid border-gray-500 p-1 text-[#656464] dark:border-white dark:text-white sm:h-10 sm:w-10">
                  {index + 1}
                </span>
                <span>
                  <FaYoutube
                    size={20}
                    className="text-[#939aa3] dark:text-white"
                  />
                </span>
                {isUserRegistered || free === 1 ? (
                  <Link to={`/${courseName}/${_id}`} className=" text-xs sm:text-base">
                    {title}
                  </Link>
                ) : (
                  <span className=" text-xs sm:text-base">{title}</span>
                )}
              </div>
              <span className="flex items-center justify-between  gap-1 text-[#7a7a7a] dark:text-white sm:gap-3 ">
                {isUserRegistered || free === 1 ? null : (
                  <span className="pb-1 ">
                    <FaLock size={15} />
                  </span>
                )}
                <span className="text-xs sm:text-base flex-grow">{time}</span>
              </span>
            </div>
          ))}
        </div>
        {/* BODY SECTION END */}
      </div>
  );
}

export { VideoAccordion };
