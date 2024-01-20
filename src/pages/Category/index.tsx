import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//icons
import { FaSearch } from "react-icons/fa";
import { FaAlignLeft, FaAngleDown, FaBorderAll } from "react-icons/fa6";

//components
import { CourseBox, Loading, Pagination, RowCourseBox } from "@/Components";

//api
import { useQueryCall } from "@/hooks";

//types
import { CourseType } from "@/types/shared";
const orderingList = [
  { title: "مرتب سازی پیش فرض", value: "default" },
  { title: "دوره های رایگان", value: "free" },
  { title: "دوره های پولی", value: "money" },
  { title: "آخرین دوره ها", value: "latest" },
  { title: "ارزان ترین دوره ها", value: "cheapest" },
  { title: "گران ترین دوره ها", value: "expensive" },
];

let category = "";

function CategoryPage() {
  const { categoryName } = useParams();
  const { data: courses = [], isLoading } = useQueryCall(
    ["categoryCourses", categoryName],
    {
      url: `/courses/category/${categoryName}`,
    },
  );
  const [status, setStatus] = useState({
    title: "مرتب سازی پیش فرض",
    value: "default",
  });
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [courseDisplayType, setCourseDisplayType] = useState("column");
  const isCourseNotExist = isLoading === false && courses.length === 0;

  // set default OrderedCourses at first render and also change the orderedCourses when category changes
  if (category !== categoryName && isLoading === false) {
    setOrderedCourses(courses);
    category = categoryName!;
  }

  useEffect(() => {
    switch (status.value) {
      case "free":
        setOrderedCourses(
          courses.filter((course: CourseType) => course.price === 0),
        );
        break;
      case "money":
        setOrderedCourses(
          courses.filter((course: CourseType) => course.price !== 0),
        );
        break;
      case "latest":
        setOrderedCourses(courses);
        break;
      case "cheapest": {
        const paidCourses = courses.filter(
          (course: CourseType) => course.price !== 0,
        );
        setOrderedCourses(
          paidCourses.sort((a: CourseType, b: CourseType) => a.price - b.price),
        );
        break;
      }
      case "expensive": {
        const paidCourses = courses.filter(
          (course: CourseType) => course.price !== 0,
        );
        setOrderedCourses(
          paidCourses.sort((a: CourseType, b: CourseType) => b.price - a.price),
        );
        break;
      }
      default:
        setOrderedCourses(courses);
    }
  }, [status, categoryName]); // eslint-disable-line

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const searchedCourses = courses.filter((course: CourseType) =>
      course.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setOrderedCourses(searchedCourses);
  };

  if (isLoading) return <Loading />;

  if (isCourseNotExist) {
    return (
      <div className="custom-container my-14 rounded-md bg-gray-color py-4 text-center dark:bg-dark-theme-secondary">
        دوره ای برای دسته بندی مورد نظر وجود ندارد
      </div>
    );
  }

  return (
    <section className="custom-container my-14">
      {/* TOP SECTION START */}
      <div className="flex flex-col items-center justify-between gap-y-6 rounded-md p-4 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme  sm:flex-row">
        <div className="flex gap-x-4">
          <div className="hidden gap-x-4 sm:flex">
            <button
              onClick={() => setCourseDisplayType("column")}
              className={`rounded-md border border-gray-300 p-2 text-dark-color dark:text-white ${
                courseDisplayType === "column" && "bg-[#1e83f0] text-white"
              }`}
            >
              <FaBorderAll size={20} />
            </button>
            <button
              onClick={() => setCourseDisplayType("row")}
              className={`rounded-md border border-gray-300 p-2 text-dark-color dark:text-white ${
                courseDisplayType === "row" && "bg-[#1e83f0] text-white"
              }`}
            >
              <FaAlignLeft size={20} />
            </button>
          </div>
          <div className="group relative text-sm transition-all">
            <div className=" flex min-w-[11rem] items-center justify-between rounded-md  border border-solid  border-gray-300 p-2 text-[#7d7e7f] duration-500 hover:bg-[#1e83f0] hover:text-white dark:text-white">
              {status.title}
              <FaAngleDown size={20} />
            </div>
            <ul className=" invisible absolute z-10 w-full  rounded-b-md border-b-4 border-solid border-primary-color bg-white pb-3  opacity-0 duration-300 group-hover:visible  group-hover:opacity-100 dark:bg-dark-theme-secondary">
              {orderingList.map((item) => (
                <li
                  key={item.title}
                  onClick={() => setStatus(item)}
                  className="cursor-pointer bg-white p-3 py-2 duration-500 first:mt-2 first:bg-[#ddd] hover:bg-[#ddd]  dark:bg-dark-theme-secondary dark:hover:bg-[#353434]"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form className="flex items-center rounded-md border border-solid border-gray-300 p-2 text-dark-color">
          <input
            className="focus:outline-none dark:bg-transparent dark:text-white"
            value={searchValue}
            onChange={handleSearch}
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
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shownCourses.length === 0 ? (
          <div className=" col-span-3 rounded-md p-4 shadow-custom dark:bg-dark-theme-secondary">
            دوره ای وجود ندارد
          </div>
        ) : (
          <>
            {shownCourses.map((courseInfo: CourseType) => {
              return courseDisplayType === "column" ? (
                <CourseBox key={courseInfo.name} {...courseInfo} />
              ) : (
                <RowCourseBox key={courseInfo.name} {...courseInfo} />
              );
            })}
          </>
        )}
      </div>
      {/* COURSE BOX SECTION END */}

      {/* PAGINATION SECTION START */}
      {shownCourses.length === 0 && orderedCourses.length === 0 ? null : (
        <Pagination items={orderedCourses} setShowedItems={setShownCourses} />
      )}
      {/* PAGINATION SECTION END */}
    </section>
  );
}

export { CategoryPage };
