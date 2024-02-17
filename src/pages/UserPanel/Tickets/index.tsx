//components
import { Loading } from "@/Components";
import {
  TicketBox,
  TicketInfoBox,
  UserPanelHeader,
} from "@/Components/UserPanel";

//api
import { useQueryCall } from "@/hooks";
//context
import { useAuthContext } from "@/context/AuthContext";

//type
import { TicketType } from "@/types/shared";

function Tickets() {
  const { token } = useAuthContext();
  const { data: userTickets = [], isLoading } = useQueryCall(["UserTickets"], {
    url: "/tickets/user",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (isLoading) return <Loading />;
  const answeredTicket = userTickets.filter(
    (ticket: TicketType) => ticket.answer,
  );

  return (
    <div className="space-y-10 sm:p-4">
      <UserPanelHeader
        title={
          <h2 className="mt-2 text-2xl">
            همه <span className="text-admin-blue-color ">تیکت ها</span>
          </h2>
        }
        buttonContent="ارسال تیکت جدید"
        buttonLink="send-ticket"
      />

      <div className="flex flex-wrap justify-center gap-4 gap-x-6">
        <TicketBox
          title="همه"
          color="text-admin-blue-color"
          subTitle={userTickets.length}
        />
        <TicketBox
          title="باز"
          color="text-lime-600"
          subTitle={userTickets.length - answeredTicket.length}
        />
        <TicketBox
          title="پاسخ داده شده"
          color="text-primary-color"
          subTitle={answeredTicket.length}
        />
        <TicketBox
          title="پاسخ داده نشده"
          color="text-red-500"
          subTitle={userTickets.length - answeredTicket.length}
        />
      </div>

      <div className="">
        <p className="mb-4">نمایش {userTickets.length} تیکت</p>
        {userTickets.map((ticketInfo: TicketType) => (
          <TicketInfoBox key={ticketInfo._id} {...ticketInfo} />
        ))}
      </div>
    </div>
  );
}

export { Tickets };
