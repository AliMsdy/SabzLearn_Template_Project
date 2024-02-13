import { Link } from "react-router-dom";

//icons
import { FaArrowLeft, FaChalkboardTeacher, FaUsers } from "react-icons/fa";

//svg
import StarUnfilled from "/images/svgs/star.svg";
import StarFilled from "/images/svgs/star_fill.svg";

//components
// import { Breathing, Image } from ;
import { Breathing, Image, ImageProps } from "react-shimmer";
//types
import { CourseType } from "@/types/shared";

function CourseBox({
  cover,
  registers,
  price,
  creator,
  name,
  shortName,
  courseAverageScore,
  isForSlider,
}: CourseType) {
  const ShimmerImage = Image as any as React.ComponentClass<ImageProps>;
  return (
    <div
      className={`flex min-h-[25rem] translate-y-0 flex-col rounded-xl shadow-xl transition-all duration-300 dark:bg-dark-theme-secondary ${
        !isForSlider && "hover:-translate-y-2"
      }`}
    >
      <Link to={`/course-info/${shortName}`}>
        <ShimmerImage
          fadeIn={true}
          src={`${import.meta.env.VITE_SITE_DOMAIN}/courses/covers/${cover}`}
          // src="https://picsum.photos/200/300"
          NativeImgProps={{
            className: "max-h-[200px] w-full rounded-t-xl",
          }}
          fallback={
            <Breathing
              width={"100%" as unknown as number}
              height={200}
              className="rounded-t-xl"
            />
          }
        />
      </Link>
      <div className="px-3">
        <Link to={`/course-info/${shortName}`} className="my-4 inline-block">
          {name}
        </Link>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaChalkboardTeacher size={25} />
            {creator}
          </span>
          <div className="flex">
            {Array(5 - courseAverageScore)
              .fill(0)
              .map((_, i) => (
                <img src={StarUnfilled} alt="score" key={i} />
              ))}

            {Array(courseAverageScore)
              .fill(0)
              .map((_, i) => (
                <img src={StarFilled} alt="score" key={i} />
              ))}
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaUsers size={25} />
            {registers}
          </span>
          <p className="text-[#6c757d] dark:text-white">
            {price === 0 ? "رایگان" : price.toLocaleString()}
          </p>
        </div>
      </div>
      {/* its parent should have flex for margin-top:auto takes effect ↓↓ */}
      <hr className="mt-auto" />

      <div className="p-4">
        <Link
          className="mx-auto flex w-max items-center justify-center gap-x-2 text-primary-color"
          to={`/course-info/${shortName}`}
        >
          مشاهده اطلاعات
          <FaArrowLeft />
        </Link>
      </div>
    </div>
  );
}

export { CourseBox };
