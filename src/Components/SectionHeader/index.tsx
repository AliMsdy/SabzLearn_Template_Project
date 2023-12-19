import { twMerge } from "tailwind-merge";

type SectionHeaderType = {
  title: string;
  desc?: string;
  className?: string;
};
function SectionHeader({ title, desc, className }: SectionHeaderType) {
  let styles =
    "relative w-max text-lg sm:text-xl md:text-2xl font-extrabold leading-relaxed text-[#444446] after:absolute after:bottom-[15%] after:right-0 after:h-2/6 after:w-full after:bg-green-500 after:bg-opacity-20 dark:text-white dark:after:hidden";
  styles = className ? twMerge(styles, className) : styles;
  return (
    <div className="relative mr-2 after:absolute after:right-[-15px] after:top-[50%] after:h-[calc(100%-10px)] after:min-h-[55px] after:w-[0.35rem] after:translate-y-[-50%] after:rotate-[8deg] after:rounded-xl after:bg-primary-color">
      <h2 className={styles}>{title}</h2>
      {desc && <p className="text-[#9c9c9c] dark:text-white">{desc}</p>}
    </div>
  );
}

export { SectionHeader };
