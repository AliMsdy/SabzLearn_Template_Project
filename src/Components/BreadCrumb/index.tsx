import { Link } from "react-router-dom";
//icons
import { FaAngleLeft, FaHouse } from "react-icons/fa6";

const breadcrumbList = [
  "خانه",
  "آموزش برنامه نویسی فرانت اند",
  "دوره متخصص جاوااسکریپت",
];
function BreadCrumb() {
  return (
    <div className="hidden items-center gap-x-4  rounded-md bg-gray-color dark:bg-dark-theme-secondary p-3 sm:flex">
      <div className="inline-block rounded-md bg-white p-2 text-[#909aa7] ">
        <FaHouse size={25} />
      </div>
      <ul className="flex gap-x-1 ">
        {breadcrumbList.map((item, index) => (
          <Link
            to="/#"
            key={item}
            className="flex items-center gap-x-1 text-[#7f8187] dark:text-white hover:text-[#7f818]"
          >
            {item}
            {breadcrumbList.length - 1 === index ? null : (
              <FaAngleLeft size={15} />
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
}

export { BreadCrumb };
