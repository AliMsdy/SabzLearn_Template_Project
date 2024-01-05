import { useParams } from "react-router-dom";
import { useState } from "react";

//icons
import { FaSearch } from "react-icons/fa";
import { FaAlignLeft, FaAngleDown, FaBorderAll } from "react-icons/fa6";

//components
import { CourseBox, Pagination } from "@/Components";


//api
import { useCategoryCourses } from "@/services/query";
//types
import { CourseType } from "@/types/shared";
const orderingList = [
  "مرتب سازی پیش فرض",
  "مرتب سازی بر اساس محبوبیت",
  "مرتب سازی بر اساس امتیاز",
  "مرتب سازی بر اساس آخرین",
  "مرتب سازی بر اساس ارزان ترین",
  "مرتب سازی بر اساس گران ترین",
];

function CategoryPage() {
  const {categoryName} = useParams()
  const {data:courses=[],isLoading} = useCategoryCourses(categoryName!)
  const [shownCourses,setShownCourses] = useState([])
  const isSelected = true
  const isCourseExist = !isLoading && courses.length !== 0
  if(!isCourseExist) {
    return <div className="text-center bg-gray-color dark:bg-dark-theme-secondary custom-container my-14 py-4 rounded-md">دوره ای برای دسته بندی مورد نظر وجود ندارد</div>
  }
  return (
    <section className="custom-container my-14">
      {/* TOP SECTION START */}
      <div className="flex flex-col items-center justify-between gap-y-6 rounded-md p-4 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme  sm:flex-row">
        <div className="flex gap-x-4">
          <div className="hidden gap-x-4 sm:flex">
            <button
              className={`rounded-md border border-gray-300 p-2 text-dark-color dark:text-white ${
                isSelected && "bg-[#1e83f0] text-white"
              }`}
            >
              <FaBorderAll size={20} />
            </button>
            <button className="rounded-md border border-gray-300 p-2 text-dark-color dark:text-white">
              <FaAlignLeft size={20} />
            </button>
          </div>
          <div className="group relative text-sm transition-all">
            <div className=" flex items-center gap-x-2 rounded-md border  border-solid border-gray-300  p-2 text-[#7d7e7f] duration-500 hover:bg-[#1e83f0] hover:text-white dark:text-white">
              مرتب سازی پیش فرض
              <FaAngleDown size={20} />
            </div>
            <ul className=" invisible absolute z-10 w-full  rounded-b-md border-b-4 border-solid border-primary-color bg-white pb-3  opacity-0 duration-300 group-hover:visible  group-hover:opacity-100 dark:bg-dark-theme-secondary">
              {orderingList.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer bg-white p-3 py-2 duration-500 first:mt-2 first:bg-[#ddd] hover:bg-[#ddd]  dark:bg-dark-theme-secondary dark:hover:bg-[#353434]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form className="flex items-center rounded-md border border-solid border-gray-300 p-2 text-dark-color">
          <input
            className="focus:outline-none dark:bg-transparent dark:text-white"
            type="text"
            placeholder="جستجوی دوره ..."
          />
          <span className="cursor-pointer text-[#7d7e7f]">
            <FaSearch size={20} />
          </span>
        </form>
      </div>
      {/* TOP SECTION END */}

      {/* COURSE BOX SECTION START */}
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shownCourses.map((courseInfo:CourseType) => (
          <CourseBox {...courseInfo} key={courseInfo.name} />
        ))}
      </div>
      {/* COURSE BOX SECTION END */}

      {/* PAGINATION SECTION START */}
      <Pagination items={courses} setShowedItems={setShownCourses} />
      {/* PAGINATION SECTION END */}
    </section>
  );
}

export { CategoryPage };
