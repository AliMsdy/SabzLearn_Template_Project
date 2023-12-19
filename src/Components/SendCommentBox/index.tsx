import { Link } from "react-router-dom";
//component
import { Button } from "..";

function SendCommentBox() {
  return (
    <div className="mt-6 pr-2">
      <span className="text-xs ">دیدگاهتان را بنویسید</span>
      <p className="mt-6 text-sm">
        <Link to="/#">با عنوان محمدامین سعیدی راد وارد شده اید.</Link>
        <Link to="/#">خارج میشوید؟</Link>
        <span>بخش های موردنیاز علامت گذاری شده اند *</span>
      </p>
      <div className="mt-8">
        <p>دیدگاه *</p>
        <textarea
          className="my-4 w-full rounded-md p-4 text-black shadow-custom dark:bg-dark-theme-secondary dark:text-white dark:shadow-dark-theme"
          placeholder="دیدگاه خود را بنویسید..."
          rows={10}
        ></textarea>
        <Button>فرستادن دیدگاه</Button>
      </div>
    </div>
  );
}

export { SendCommentBox };
