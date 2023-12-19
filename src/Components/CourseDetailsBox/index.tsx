//type
import { IconType } from "react-icons";

type CourseDetailBoxType = {
  title: string;
  subTitle: string;
  Icon: IconType;
};

function CourseDetailBox({ title, subTitle, Icon }: CourseDetailBoxType) {
  return (
    <div
      key={title}
      className="flex items-center gap-x-4 rounded-lg p-2 py-5 text-sm shadow-custom md:text-base lg:p-4 dark:bg-dark-theme-secondary"
    >
      <Icon className="text-primary-color" size={45} />
      <div>
        <p className="text-[#858c96] dark:text-white">{title}</p>
        <p className="mt-1 text-[#7d7e7f] dark:text-white">{subTitle}</p>
      </div>
    </div>
  );
}

export { CourseDetailBox };
