import { Link } from "react-router-dom";

//components
import { Button } from "@/Components";
//icons
import { HiOutlineDotsVertical } from "react-icons/hi";

import { cn } from "@/lib/utils";

//type
import { TicketType } from "@/types/shared";

function TicketInfoBox(props: TicketType) {
  const { title, departmentSubID, createdAt, answer, _id } = props;
  return (
    <div className="relative mb-6 flex flex-col justify-between gap-y-6 rounded-lg p-4 py-6 pr-6 shadow-custom before:absolute before:right-0 before:top-0 before:h-full before:w-2 before:rounded-r-lg before:bg-primary-color dark:bg-slate lg:flex-row">
      <div className="flex w-full items-center justify-center gap-4 sm:justify-evenly lg:w-auto">
        <div className="flex flex-col gap-y-6">
          {answer ? (
            <Link className="text-center" to={`answered-ticket/${_id}`}>
              {title}
            </Link>
          ) : (
            <span className="text-center ">{title}</span>
          )}
          <Button
            variant="unfilled"
            component={answer ? "link" : ""}
            to={answer ? `answered-ticket/${_id}` : ""}
            className={cn(
              "flex gap-x-3 rounded-3xl p-3 py-5 dark:border-none dark:bg-white dark:text-black",
              {
                "cursor-pointer": answer,
              },
              {
                "cursor-default": !answer,
              },
            )}
          >
            <HiOutlineDotsVertical size={22} />
            <span>{departmentSubID}</span>
          </Button>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-x-8 sm:justify-evenly lg:w-auto">
        <div>
          <Button
            component={answer ? "link" : ""}
            to={answer ? `answered-ticket/${_id}` : ""}
            className={cn(
              " flex gap-x-4 rounded-3xl rounded-tl-none border-2 border-solid  bg-transparent text-black dark:text-white",
              {
                "border-primary-color": answer,
              },
              {
                "cursor-default  border-[#f0932b]": !answer,
              },
            )}
          >
            <span
              className={cn(
                "block h-2 w-3 rounded-full  sm:h-4 sm:w-4",
                {
                  "bg-primary-color": answer,
                },
                {
                  "bg-[#f0932b]": !answer,
                },
              )}
            />
            {answer === 1 ? "پاسخ داده شده" : "پاسخ داده نشده"}
          </Button>
        </div>
        <div className="flex flex-col gap-y-2 text-center">
          <span className="text-left sm:text-center">
            {new Date(createdAt).toLocaleString("fa-IR")}
          </span>
        </div>
      </div>
    </div>
  );
}

export { TicketInfoBox };
