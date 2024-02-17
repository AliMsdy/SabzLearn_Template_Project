import { useParams } from "react-router-dom";

//icons
import { BsPaperclip } from "react-icons/bs";
import { FaMicrophone, FaPlus } from "react-icons/fa6";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
//components
import { Button } from "@/Components";
import { UserPanelHeader } from "@/Components/UserPanel";
import { AnswerComponent } from "./AnswerComponent";
import { TicketComponent } from "./TicketComponent";

//api
import { useQueryCall } from "@/hooks";
//context
import { useAuthContext } from "@/context/AuthContext";
//type

function ShowAnsweredTicket() {
  const { ticketID } = useParams();
  const { token } = useAuthContext();
  const { data: ticketData ={} } = useQueryCall(["AnsweredTicket", ticketID], {
    url: `/tickets/answer/${ticketID}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div>
      <UserPanelHeader
        title={
          <h2 className="mt-2 text-2xl">
            مشاهده <span className="text-admin-blue-color">تیکت</span>
          </h2>
        }
        buttonContent="ارسال تیکت جدید"
        buttonLink="/my-account/user-tickets/send-ticket"
      />

      <div className="flex items-center gap-4">
        <Button
          component="link"
          to="/my-account/user-tickets"
          className="rounded-full bg-gray-400 p-3"
        >
          <SlArrowRight size={20} />
        </Button>
        <div className="flex flex-col gap-y-2">
          <span className="text-xl ">تیکت تست</span>
          <span className="text-sm text-slate">شناسه تیکت: 2732</span>
        </div>
      </div>

      <div className="relative mt-6 flex w-min gap-4  before:absolute before:right-1/2 before:h-full before:w-0.5 before:translate-x-1/2 before:rounded-xl before:bg-slate">
        <Button
          className="gap-x-2 bg-transparent p-2 text-black dark:text-white
        "
        >
          <FaMicrophone size={20} />
          <RiArrowRightDoubleLine size={12} />
        </Button>
        <Button
          className="gap-x-2 bg-transparent p-2 text-black dark:text-white
        "
        >
          <BsPaperclip size={20} />
          <RiArrowRightDoubleLine size={12} />
        </Button>
      </div>

      <div className="relative mt-6 border-t-2 border-solid border-slate bg-red-500">
        <span className="absolute right-1/2 top-1/2 flex -translate-y-1/2 translate-x-1/2 items-center gap-x-3 rounded-3xl bg-slate p-1 px-3 text-white">
          <FaPlus />
          ارسال پاسخ
        </span>
      </div>

      {/* ticket component */}
      <TicketComponent body={ticketData.ticket} />

      <div className="relative mt-6 border-t-2 border-solid border-slate bg-red-500">
        <span className="absolute right-1/2 top-1/2 flex -translate-y-1/2 translate-x-1/2 items-center gap-x-3 bg-slate p-1 px-3 text-white">
          پاسخ ها
        </span>
      </div>

      {/* answer component */}
      <AnswerComponent body={ticketData.answer}/>
    </div>
  );
}

export { ShowAnsweredTicket };
