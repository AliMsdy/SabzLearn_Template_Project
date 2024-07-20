//component
import { Button } from "..";

//icon
import { TiArrowBack } from "react-icons/ti";

//type
import { CommentType } from "@/types/shared";

function CommentBox(props: CommentType) {
  const { creator, createdAt, body, answerContent } = props;
  return (
    <div className="mb-10 rounded-md border  border-solid border-[#ece3e3] bg-[#f7f7f7] p-4 last:mb-0 dark:border-none dark:bg-[#484965] dark:shadow-dark-theme">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 text-sm sm:gap-3">
          <span>{creator?.name}</span>
          <Button className="cursor-default p-2 text-xs">
            {creator?.role === "ADMIN" ? "مدیر" : "کاربر سایت"}
          </Button>
          <span className="text-[#a69595]">{createdAt.slice(0, 10)}</span>
        </div>
        <Button className="hidden border border-solid border-gray-400 bg-white p-2 text-sm text-black sm:block">
          پاسخ
        </Button>
        <TiArrowBack className="text-[#94A3B8] sm:hidden" size={30} />
      </div>
      <p className="mt-5 text-sm">{body}</p>
      {answerContent !== null && (
        <div className="mb-10 mt-5 rounded-md border  border-solid border-[#ece3e3] bg-[#f7f7f7] p-4 last:mb-0 dark:border-none dark:bg-[#484965] dark:shadow-dark-theme sm:px-4">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2 text-sm sm:gap-3">
              <span>{answerContent.creator?.name}</span>
              <Button className="cursor-default p-2 text-xs">
                {answerContent.creator?.role === "ADMIN"
                  ? "مدیر"
                  : "کاربر سایت"}
              </Button>
              <span className="text-[#a69595]">
                {answerContent.createdAt.slice(0, 10)}
              </span>
            </div>
            <Button className="hidden border border-solid border-gray-400 bg-white p-2 text-sm text-black sm:block">
              پاسخ
            </Button>
            <TiArrowBack className="text-[#94A3B8] sm:hidden" size={30} />
          </div>
          <p className="mt-5 text-sm">{answerContent.body}</p>
        </div>
      )}
    </div>
  );
}

export { CommentBox };
