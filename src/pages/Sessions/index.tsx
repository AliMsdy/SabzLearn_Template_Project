import { Link, useParams } from "react-router-dom";

//icons
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaPlay } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
//api
import { useQueryCall } from "@/hooks";

//components
import { Loading } from "@/Components";

//context
import { useAuthContext } from "@/context/AuthContext";

function Sessions() {
  const { courseName, sessionID } = useParams();
  const { token } = useAuthContext();
  const { data: sessionsData = {}, isLoading } = useQueryCall(
    ["SessionsData", sessionID],
    {
      url: `/courses/${courseName}/${sessionID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (isLoading) return <Loading />;

  return (
    <section className="custom-container my-20 grid grid-cols-12 gap-4 px-0">
      <div className="relative order-2 col-span-12 mt-6 max-h-[450px] overflow-auto sm:order-1 sm:col-span-4 sm:mt-0 lg:max-h-[550px]">
        <h2 className="sticky top-0 flex items-center justify-center gap-4 bg-gray-200 p-2 dark:bg-slate sm:p-4">
          <span>
            <FaBookOpen size={20} />
          </span>
          <span>لیست جلسات</span>
        </h2>
        <ul className="mt-4">
          {sessionsData.sessions.map(
            ({
              title,
              _id,
              time,
            }: {
              title: string;
              _id: string;
              time: string;
            }) => (
              <li
                key={_id}
                className="flex items-center border-t-2 border-solid border-gray-300 p-2 sm:p-4"
              >
                <div className="flex flex-grow items-center gap-x-2 sm:gap-x-5">
                  <span>
                    <FaPlay
                      size={20}
                      className="text-[#939aa3] dark:text-white"
                    />
                  </span>
                  <Link
                    to={`/${courseName}/${_id}`}
                    className=" text-xs sm:text-base"
                  >
                    {title}
                  </Link>
                </div>
                <span className="flex items-center justify-between  gap-1 text-[#7a7a7a] dark:text-white sm:gap-3 ">
                  <span className="flex-grow text-xs sm:text-base">{time}</span>
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="order-1 col-span-12 rounded-lg bg-gray-200 dark:bg-slate sm:col-span-8">
        <div className="flex items-center justify-between rounded-t-lg bg-[#bbb2b2] p-2 dark:bg-[#2d2c2c] sm:p-4">
          <Link
            to={`/course-info/${courseName}`}
            className="flex gap-2 text-sm sm:gap-3 sm:text-base"
          >
            <span>
              <SlArrowRight size={20} />
            </span>
            <span>به خانه دوره بروید</span>
            <span>
              <IoHome size={20} />
            </span>
          </Link>
          <div className="text-sm sm:text-base">
            {sessionsData.session.title}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center p-2 sm:p-8">
          <video
            className="w-full rounded-lg"
            controls
            src={`/images/courses/covers/${
              sessionsData.session.video
            }`}
          ></video>
        </div>

        <div className="mt-6 flex justify-between px-8 pb-4 sm:mt-4">
          <Link to="/" className="flex items-center gap-3">
            <FaArrowRight />
            قبلی
          </Link>
          <Link to="/" className="flex items-center gap-3">
            بعدی
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { Sessions };
