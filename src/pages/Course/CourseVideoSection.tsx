import { Link } from "react-router-dom";

//list
import { socialList } from "@/shared/Lists";

type CourseVideoSectionProps = {
  title: string;
  name: string;
  desc: string;
  cover: string;
};

function CourseVideoSection({
  title,
  name,
  cover,
  desc: description,
}: CourseVideoSectionProps) {
  return (
    <div className="mt-16 grid grid-cols-1 gap-6 gap-y-8 rounded-md p-4 shadow-custom dark:shadow-dark-theme lg:grid-cols-2">
      <div className="order-2 flex flex-col gap-y-6 lg:order-1">
        <Link
          to="/#"
          className="w-max rounded-md bg-green-200 p-1 px-2 text-xs text-primary-color"
        >
          {title}
        </Link>
        <h1 className="text-2xl font-bold text-[#464749] dark:text-white">
          {name}
        </h1>
        <p className="text-secondary-color dark:text-white">{description}</p>
        <div className="flex gap-x-5">
          {socialList.map(({ path, Icon }, index) => (
            <Link
              className="text-[#b1bbbf] hover:text-[#1e83f0] dark:text-white dark:hover:text-[#1e83f0]"
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
            poster={`/images/courses/covers/${cover}`}
            controls
          ></video>
        </div>
      </div>
    </div>
  );
}
export { CourseVideoSection };
