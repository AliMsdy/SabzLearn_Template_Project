import { Link } from "react-router-dom";
import { Breathing, Image, ImageProps } from "react-shimmer";
//type
import { CourseType } from "@/types/shared";

//icons
import { FaChalkboardTeacher } from "react-icons/fa";

//svg
import { FaUsers } from "react-icons/fa6";
import StarUnfilled from "/images/svgs/star.svg";
import StarFilled from "/images/svgs/star_fill.svg";

function RowCourseBox({
  cover,
  registers,
  price,
  creator,
  name,
  shortName,
  description,
}: CourseType) {
  const ShimmerImage = Image as any as React.ComponentClass<ImageProps>;

  return (
    <div className="col-span-3 flex rounded-xl text-xs dark:bg-dark-theme-secondary sm:text-sm lg:text-base shadow-xl">
      <div className="max-h-[200px] w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Link className="w-full" to={`/course-info/${shortName}`}>
          <ShimmerImage
            fadeIn={true}
            src={`/images/courses/${cover}`}
            // src="https://picsum.photos/200/300"
            NativeImgProps={{
              className: "h-full max-w-full rounded-r-xl lg:object-cover",
            }}
            fallback={
              <Breathing
                width={"100%" as unknown as number}
                height={"100%" as unknown as number}
                className="rounded-t-xl"
              />
            }
          />
        </Link>
      </div>
      <div className="flex flex-grow flex-col justify-between px-2 md:px-4">
        <Link
          to={`/course-info/${shortName}`}
          className="my-4 inline-block pr-2"
        >
          {name}
        </Link>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaChalkboardTeacher size={20} />
            {creator}
          </span>
          <div className="flex">
            <img
              className="w-3 sm:w-full"
              src={StarUnfilled}
              alt="rating-star"
            />
            {Array.from(Array(4)).map((_, i) => (
              <img
                className="w-3 sm:w-full"
                key={i}
                src={StarFilled}
                alt="rating-star"
              />
            ))}
          </div>
        </div>

        <p className="my-2 md:my-4 text-[#6c757d] dark:text-white">{description}</p>

        <div className="my-4 flex items-center justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaUsers size={20} />
            {registers}
          </span>
          <p className="text-[#6c757d] dark:text-white">
            {price === 0 ? "رایگان" : price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export { RowCourseBox };
