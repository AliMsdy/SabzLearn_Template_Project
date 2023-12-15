//icons
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaSearch,
} from "react-icons/fa";
import { FaAlignLeft, FaAngleDown, FaBorderAll } from "react-icons/fa6";

//components
import { CourseBox } from "@/Components";

//list
import { CourseList } from "@/shared/Lists";
const orderingList = [
  "مرتب سازی پیش فرض",
  "مرتب سازی بر اساس محبوبیت",
  "مرتب سازی بر اساس امتیاز",
  "مرتب سازی بر اساس آخرین",
  "مرتب سازی بر اساس ارزان ترین",
  "مرتب سازی بر اساس گران ترین",
];

function CategoryPage() {
  const isSelected = true;
  return (
    <main>
      <section className="container mx-auto my-14 max-w-[90%] md:max-w-[85%]">
        {/* TOP SECTION */}
        <div className="flex flex-col items-center justify-between gap-y-6 rounded-md p-4 shadow-[0_0_13px_1px_rgba(70,72,77,0.2)] sm:flex-row">
          <div className="flex gap-x-4">
            <div className="hidden gap-x-4 sm:flex">
              <button
                className={`rounded-md border border-gray-300 p-2 text-dark-color ${
                  isSelected && "bg-[#1e83f0] text-white"
                }`}
              >
                <FaBorderAll size={20} />
              </button>
              <button className="rounded-md border border-gray-300 p-2 text-dark-color">
                <FaAlignLeft size={20} />
              </button>
            </div>
            <div className="group relative text-sm transition-all">
              <div className=" flex items-center gap-x-2 rounded-md border  border-solid border-gray-300  p-2 text-[#7d7e7f] duration-500 hover:bg-[#1e83f0] hover:text-white">
                مرتب سازی پیش فرض
                <FaAngleDown size={20} />
              </div>
              <ul className=" invisible absolute z-10 w-full  rounded-b-md border-b-4 border-solid border-primary-color bg-white  pb-3 opacity-0 duration-300  group-hover:visible group-hover:opacity-100">
                {orderingList.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer bg-white p-3 py-2 duration-500 first:mt-2 first:bg-[#ddd] hover:bg-[#ddd]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <form className="flex items-center rounded-md border border-solid border-gray-300 p-2 text-dark-color">
            <input
              className="focus:outline-none"
              type="text"
              placeholder="جستجوی دوره ..."
            />
            <span className="cursor-pointer text-[#7d7e7f]">
              <FaSearch size={20} />
            </span>
          </form>
        </div>

        {/* COURSEBOX SECTION */}
        <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CourseList.slice(0, 3).map((courseInfo) => (
            <CourseBox {...courseInfo} key={courseInfo.title} />
          ))}
        </div>

        {/* PAGINATION SECTION */}
        <div className="mt-14 flex items-center justify-center gap-x-4 transition-all">
          <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f0f0f1] p-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white ">
            <FaLongArrowAltRight size={15} />
          </button>
          {Array.from(Array(3)).map((_, index) => (
            <button
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f0f0f1] p-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white"
            >
              {index + 1}
            </button>
          ))}
          <button className="flex h-10 w-10 items-center justify-center rounded-md bg-[#f0f0f1] p-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white ">
            <FaLongArrowAltLeft size={15} />
          </button>
        </div>
      </section>
    </main>
  );
}

export { CategoryPage };
