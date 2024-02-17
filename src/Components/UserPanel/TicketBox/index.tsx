import { HiTicket } from "react-icons/hi2";
type TicketBoxProps = {
  title: string;
  subTitle: number;
  color: string;
};
function TicketBox(props: TicketBoxProps) {
  const { title, subTitle, color } = props;
  return (
    <div
      className={`flex min-w-[150px] flex-col items-center gap-y-3 rounded-md p-3 px-6 shadow-custom dark:bg-dark-theme-secondary ${color}`}
    >
      <HiTicket size={25} />
      <span className={color}>{title}</span>
      <span className="text-black dark:text-white">{subTitle}</span>
    </div>
  );
}

export { TicketBox };
