//type
import type { IconType } from "react-icons";

function ArticleDetail({ title, Icon }: { title: string; Icon: IconType }) {
    return (
      <div key={title} className="flex items-center gap-x-2">
        <Icon size={18} className="text-[#c7c7c7] dark:text-white" />
        <span className="text-[#8f8f8f] dark:text-white">{title}</span>
      </div>
    );
  }

  export {ArticleDetail}