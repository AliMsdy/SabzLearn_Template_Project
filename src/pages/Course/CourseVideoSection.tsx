import { Link } from "react-router-dom";

//list 
import { socialList } from "@/shared/Lists";

function CourseVideoSection() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 gap-y-8 rounded-md p-4 shadow-custom dark:shadow-dark-theme lg:grid-cols-2">
      <div className="order-2 flex flex-col gap-y-6 lg:order-1">
        <Link
          to="/#"
          className="w-max rounded-md bg-green-200 p-1 px-2 text-xs text-primary-color"
        >
          آموزش برنامه نویسی فرانت اند
        </Link>
        <h1 className="text-2xl font-bold text-[#464749] dark:text-white">
          آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
        </h1>
        <p className="text-secondary-color dark:text-white">
          امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به
          قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla
          Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک های موجود
          استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس عالی فرانت اند
          باشید، باید کتابخانه های کاربردی که در بازار کار استفاده می شوند را به
          خوبی بلد باشید
        </p>
        <div className="flex gap-x-5">
          {socialList.map(({ path, Icon }, index) => (
            <Link
              className="text-[#b1bbbf] dark:text-white dark:hover:text-[#1e83f0] hover:text-[#1e83f0]"
              key={index}
              to={path}
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <div className="flex h-full items-center">
          <video
            className="w-full rounded-lg"
            poster="/src/assets/images/courses/js_project.png"
            controls
          ></video>
        </div>
      </div>
    </div>
  );
}
export { CourseVideoSection };

