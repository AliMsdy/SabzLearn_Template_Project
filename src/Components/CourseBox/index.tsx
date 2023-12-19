import { Link } from "react-router-dom";

//icons
import { FaArrowLeft, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

//svg
import StarUnfilled from "@/assets/images/svgs/star.svg";
import StarFilled from "@/assets/images/svgs/star_fill.svg";
import { useState } from "react";
//components
import { Loading } from "..";

type CourseType = {
  imgSrc: string;
  numberOfStudents: number;
  price: number;
  teacher: string;
  title: string;
  path: string;
  isForSlider?: boolean;
};

function CourseBox({
  imgSrc,
  numberOfStudents,
  price,
  teacher,
  title,
  path,
  isForSlider,
}: CourseType) {
  const [loading, setLoading] = useState(true);

  const onImgLoad = () => setLoading(false);
  return (
    <div
      className={`flex min-h-[25rem] translate-y-0 flex-col rounded-xl shadow-xl transition-all duration-300 dark:bg-dark-theme-secondary ${
        !isForSlider && "hover:-translate-y-2"
      }`}
    >
      <Link to={path}>
        <img
          className="h-auto max-h-[200px] w-full rounded-t-xl"
          src={imgSrc}
          // src="https://picsum.photos/200/300"
          alt="course-picture"
          onLoad={onImgLoad}
        />
        {loading && <Loading />}
      </Link>
      <div className="px-3">
        <Link to={path} className="my-4 inline-block">
          {title}
        </Link>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaChalkboardTeacher size={25} />
            {teacher}
          </span>
          <div className="flex">
            <img src={StarUnfilled} alt="rating-star" />
            {Array.from(Array(4)).map((_, i) => (
              <img key={i} src={StarFilled} alt="rating-star" />
            ))}
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaUsers size={25} />
            {numberOfStudents}
          </span>
          <p className="text-[#6c757d] dark:text-white">
            {price.toLocaleString()}
          </p>
        </div>
      </div>
      {/* its parent should have flex for margin-top:auto takes effect ↓↓ */}
      <hr className="mt-auto" />

      <div className="p-4">
        <Link
          className="mx-auto flex w-max items-center justify-center gap-x-2 text-primary-color"
          to={path}
        >
          مشاهده اطلاعات
          <FaArrowLeft />
        </Link>
      </div>
    </div>
  );
}

export { CourseBox };
