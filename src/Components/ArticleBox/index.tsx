import { Link } from "react-router-dom";

type ArticleBoxType = {
  title: string;
  desc: string;
  Img: string;
  path: string;
};

function ArticleBox({ title, desc, Img, path }: ArticleBoxType) {
  return (
    <div className="flex min-h-[28rem] flex-col rounded-xl shadow-xl">
      <Link to={path} className="text-center">
        <img
          className="inline-block h-[15rem] w-full max-w-[400px]"
          src={Img}
          alt="article-picture"
        />
      </Link>
      <div className="flex h-full flex-col px-6 pb-6">
        <Link to={path} className="mb-2 mt-4 font-bold ">
          {title}
        </Link>
        <p className=" text-xs text-[#898989]">{desc + " ..."}</p>
        <Link
          to={path}
          className="mt-auto rounded-md border-2 border-solid border-primary-color p-2 text-center text-sm text-primary-color transition-all duration-300 hover:bg-primary-color hover:text-white"
        >
          بیشتر بخوانید
        </Link>
      </div>
    </div>
  );
}

export { ArticleBox };
