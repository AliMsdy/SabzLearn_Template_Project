import { cn } from "@/lib/utils";
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
  discount,
  description,
}: CourseType) {
  const ShimmerImage = Image as any as React.ComponentClass<ImageProps>;

  return (
    <div className="relative col-span-3 flex rounded-xl text-xs shadow-xl dark:bg-dark-theme-secondary sm:text-sm lg:text-base">
      <div className="max-h-[220px] w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Link className="w-full" to={`/course-info/${shortName}`}>
          <ShimmerImage
            fadeIn={true}
            src={`/images/courses/covers/${cover}`}
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
            <span className="flex items-center gap-x-1">
              <span>مدرس:</span>
              <span className="mt-1 block">{creator}</span>
            </span>
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

        <p className="my-2 text-[#6c757d] dark:text-white md:my-4">
          {description}
        </p>

        <div className="my-4 flex items-center justify-between">
          <span className="flex items-center gap-x-3 text-[#6c757d] dark:text-white">
            <FaUsers size={20} />
            <span className="flex items-center gap-x-2">
              <span>تعداد دانشجو:</span>
              <span className="mt-1 block">{registers}</span>
            </span>
          </span>
          <div className="text-[#6c757d] dark:text-white">
            <div
              className={cn({
                "line-through": !!(discount && price !== 0),
              })}
            >
              {price === 0 ? "رایگان" : `${price.toLocaleString()} تومان`}
            </div>
            {price !== 0 && !!discount && (
              <div className="text-left">
                {`${(price - price * (discount / 100)).toLocaleString()} تومان`}
              </div>
            )}
          </div>
        </div>
      </div>
      {!!discount && price !== 0 && (
        <div className="absolute -left-2 -top-2 -rotate-[15deg] rounded-lg bg-primary-color p-2 px-4 text-white transition-transform duration-300 hover:-rotate-45">
          {discount}%
        </div>
      )}
    </div>
  );
}

export { RowCourseBox };
