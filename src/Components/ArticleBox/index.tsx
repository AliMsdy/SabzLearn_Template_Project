import { Link } from "react-router-dom";
//component
import { Button,Loading } from "..";
import { useState } from "react";
type ArticleBoxType = {
  title: string;
  desc: string;
  Img: string;
  path: string;
};

function ArticleBox({ title, desc, Img, path }: ArticleBoxType) {
  const [loading,setLoading] = useState(true)
  const onImgLoad = () => setLoading(false);
  return (
    <div className="flex min-h-[28rem] flex-col rounded-xl shadow-xl dark:bg-dark-theme-secondary">
      <Link to={path} className="text-center">
        <img
          className="inline-block h-[15rem] rounded-t-lg w-full "
          src={Img}
          // src="https://picsum.photos/200/300"
          alt="article-picture"
          onLoad={onImgLoad}
        />
      </Link>
      {
        loading && <Loading />
      }
      <div className="flex h-full flex-col px-6 pb-6">
        <Link to={path} className="mb-2 mt-4 font-bold ">
          {title}
        </Link>
        <p className=" text-xs text-[#898989] dark:text-white">{desc + " ..."}</p>
        <Button to={path} variant="unfilled" className="mt-auto text-sm">
          بیشتر بخوانید
        </Button>
      </div>
    </div>
  );
}

export { ArticleBox };
