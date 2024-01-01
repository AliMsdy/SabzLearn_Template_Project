//component
import { Button } from "..";

//icon
import { TiArrowBack } from "react-icons/ti";

//type
import { CommentType } from "@/types/shared";

function CommentBox(props:CommentType) {
  return (
    <div className="rounded-md border border-solid  border-[#ece3e3] mb-10 bg-[#f7f7f7] p-4 last:mb-0 dark:bg-[#484965] dark:shadow-dark-theme dark:border-none">
      <div className="flex items-center justify-between ">
        <div className="flex gap-2 sm:gap-3 items-center text-sm">
          <span>{props.creator.name}</span>
          <Button className="p-2 text-xs cursor-default">{
            props.creator.role === "ADMIN" ? "مدیر" : "کاربر سایت"
          }</Button>
          <span className="text-[#a69595]">{props.createdAt.slice(0,10)}</span>
        </div>
        <Button className="bg-white text-sm p-2 text-black border-solid border-gray-400 border hidden sm:block">پاسخ</Button>
        <TiArrowBack className="sm:hidden text-[#94A3B8]" size={30} />
      </div>
      <p className="mt-5 text-sm">
        {props.body}
      </p>
    </div>
  );
}

export { CommentBox };
