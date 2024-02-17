type AnswerComponentType = {
  body: string;
};

function AnswerComponent(props:AnswerComponentType) {
  const { body } = props;
  return (
    <div className=" mt-6 flex flex-row-reverse ">
      <div className="flex flex-col items-end">
        <div className="w-fit rounded-xl rounded-bl-none bg-admin-blue-color p-3 px-5 text-white">
          {body}
        </div>
        <div className="mt-4 flex gap-x-3 text-sm text-gray-400">
          <span>محمد امین سعیدی راد</span>
          <span>۱۴۰۲/۱۱/۲۷, ۲۱:۱۳:۵۸</span>
        </div>
      </div>
    </div>
  );
}

export { AnswerComponent };
