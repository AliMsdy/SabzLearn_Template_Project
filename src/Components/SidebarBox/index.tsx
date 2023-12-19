import { Children } from "@/types/shared";

type SidebarBoxType = Children & {
  title?: string | React.ReactNode;
  badge?:boolean;
};

function SidebarBox({ children, title,badge }: SidebarBoxType) {
  return (
      <div className='relative dark:shadow-dark-theme flex flex-col justify-center rounded-md p-4 text-secondary-color shadow-custom dark:text-white overflow-hidden dark:bg-dark-theme-secondary'>
        {title && (
          <div className={`mb-4  flex items-center gap-x-2  text-xl ${badge && "after:bg-primary-color after:w-[23px] after:h-[39px] after:rounded-bl-[12px] after:skew-x-[-10deg] after:absolute after:rounded-tl-[8px] pr-3 after:right-[-6px]"}`}>{title}</div>
        )}
        {children}
      </div>
  );
}

export { SidebarBox };
