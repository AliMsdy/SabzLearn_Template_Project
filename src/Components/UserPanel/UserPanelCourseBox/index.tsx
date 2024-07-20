import { Link } from "react-router-dom";
import { Breathing, Image, ImageProps } from "react-shimmer";
//type
import { CourseType } from "@/types/shared";

//icons
import { FaChalkboardTeacher } from "react-icons/fa";

//svg
import StarUnfilled from "/images/svgs/star.svg";
import StarFilled from "/images/svgs/star_fill.svg";

function UserPanelCourseBox({
  cover,
  price,
  isComplete,
  name,
  shortName,
  support,
}: CourseType) {
  const ShimmerImage = Image as any as React.ComponentClass<ImageProps>;

  return (
    <div className="col-span-3 my-10 flex rounded-xl text-xs shadow-xl dark:bg-dark-theme-secondary sm:text-sm lg:text-base">
      <div className="max-h-[200px] w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <Link className="w-full" to={`/course-info/${shortName}`}>
          <ShimmerImage
            fadeIn={true}
            src={`${import.meta.env.VITE_BASE_URL}/${cover}`}
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
            وضعیت دوره :{isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
          </span>
          <div className="hidden sm:flex">
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
        <div className="my-4 flex items-center justify-between">
          <span className="hidden items-center gap-x-3 text-[#6c757d] dark:text-white sm:flex">
            <span>نحوه پشتیبانی : </span>
            <span className="text-primary-color">{support}</span>
          </span>
          <p className="flex text-[#6c757d] dark:text-white">
            <span className="text-primary-color">مبلغ : </span>
            <span>
              {" "}
              {price === 0
                ? "رایگان"
                : `${price.toLocaleString("fa-IR")} تومان`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export { UserPanelCourseBox };
