import { Link } from "react-router-dom";
//component
import { Breathing, Image, ImageProps } from "react-shimmer";
import { Button } from "..";
type ArticleBoxType = {
  title: string;
  description: string;
  cover: string;
  shortName: string;
};

function ArticleBox({ title, description, cover, shortName }: ArticleBoxType) {
  const ShimmerImage = Image as any as React.ComponentClass<ImageProps>;

  return (
    <div className="flex min-h-[24rem] flex-col rounded-xl shadow-xl dark:bg-dark-theme-secondary">
      <Link to={`/article-info/${shortName}`} className="text-center">
        <ShimmerImage
          fadeIn={true}
          src={`/images/blog/${cover}`}
          NativeImgProps={{
            className: "max-h-[200px] w-full rounded-t-xl",
            alt: "article-picture",
          }}
          fallback={
            <Breathing
              width={"100%" as unknown as number}
              height={200}
              className="rounded-t-xl"
            />
          }
        />
      </Link>
      <div className="flex h-full flex-col px-6 pb-6">
        <Link
          to={`/article-info/${shortName}`}
          className="mb-2 mt-4 font-bold "
        >
          {title}
        </Link>
        <p className=" text-xs text-[#898989] dark:text-white">
          {description + " ..."}
        </p>
        <Button
          component="link"
          to={`/article-info/${shortName}`}
          variant="unfilled"
          className="mt-auto text-sm"
        >
          بیشتر بخوانید
        </Button>
      </div>
    </div>
  );
}

export { ArticleBox };
