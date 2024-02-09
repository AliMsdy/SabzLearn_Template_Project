//type
import { IconType } from "react-icons";
type AdminPanelBoxProps = {
  title: string;
  Icon: IconType;
  desc: string;
};

function AdminPanelBox({ title, Icon, desc }: AdminPanelBoxProps) {
  const titleStyle =
    "after:absolute before:absolute after:bg-admin-blue-color before:bg-admin-blue-color after:shadow-[0px_0px_5px_1px_#1943da81] before:shadow-[0px_0px_5px_1px_#1943da81] after:top-1/2 before:top-1/2 after:w-[20px] before:w-[20px] after:h-[3px] before:h-[3px] after:rounded-full before:rounded-full before:-right-8 after:-left-8";
  return (
    <div className="rounded-md bg-white dark:bg-dark-theme-primary p-4 shadow-admin-panel-box-shadow">
      <h3 className={`mr-7 text-2xl font-bold `}>
        <span className={`relative ${titleStyle}`}>{title}</span>
      </h3>
      <div className="my-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-8 font-vazir font-bold">
          <span className="text-lg">$2,420</span>
          <span className="text-[#1ad61a]">+5.2%</span>
        </div>
        <Icon className="text-admin-blue-color" size={30} />
      </div>
      <p className="font-vazir text-[#a3abb1]">{desc}</p>
    </div>
  );
}

export { AdminPanelBox };
