
type TicketComponentType = {
  body:string
}
function TicketComponent(props:TicketComponentType) {
  const {body} = props
  return (
    <div className="mt-6">
        <div className="w-fit rounded-xl rounded-br-none bg-primary-color p-3 px-5 text-white">
          {body}
        </div>
        <div className="mt-4 flex gap-x-3 pr-3 text-sm text-gray-400">
          <span>محمد امین سعیدی راد</span>
          <span>۱۴۰۲/۱۱/۲۷, ۲۱:۱۳:۵۸</span>
        </div>
      </div>
  )
}

export { TicketComponent }