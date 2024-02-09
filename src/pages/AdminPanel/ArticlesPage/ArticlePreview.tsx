import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

//components
import { ArticleDetail } from "@/Components";

//context
import { useAuthContext } from "@/context/AuthContext";

//icons
import { FaClock, FaFolder, FaUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

//type
import type { AddNewArticleInputTypes, SetState } from "@/types/shared";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
type ArticlePreviewPropsType = {
  setShowArticlePreview: SetState<boolean>;
  methods: UseFormReturn<AddNewArticleInputTypes, any, undefined>;
  preview: string | ArrayBuffer | null;
  model: string;
  categories: any;
};

function ArticlePreview({
  setShowArticlePreview,
  methods,
  preview,
  model,
  categories,
}: ArticlePreviewPropsType) {
  const [category, setCategory] = useState("");
  const { userInfos } = useAuthContext();

  useEffect(() => {
    const categoryTitle = categories.find(
      (category: any) => category._id === methods.getValues("categoryID"),
    )?.title;
    setCategory(categoryTitle ? categoryTitle : "پیش فرض");
  }, [categories, methods]);

  return (
    <div className="absolute right-1/2 top-1 z-20 mt-8 h-[90%] w-[80%] translate-x-1/2 overflow-auto rounded-lg border-2 border-solid p-2">
      <div className="mb-4 flex justify-between rounded-md bg-[#cccccc] p-2 dark:bg-admin-secondary-dark-color">
        <span>پیش نمایش مقاله شما....</span>
        <IoClose
          size={25}
          className="cursor-pointer"
          onClick={() => setShowArticlePreview(false)}
        />
      </div>
      <div className="rounded-md border-2 border-solid border-[#c1c1c1] bg-white dark:bg-dark-theme-secondary p-8 font-iranSanse blog-content">
        <h1 className="mb-4 border-b-2 border-solid border-gray-400 pb-4 text-2xl font-bold text-dark-color  dark:text-white">
          {methods.getValues("title")}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-4 text-[0.8rem]">
          <ArticleDetail Icon={FaFolder} title={`دسته بندی: ${category}`} />
          <ArticleDetail
            Icon={FaUser}
            title={`ارسال شده توسط: ${userInfos?.name}`}
          />
          <ArticleDetail
            Icon={FaClock}
            title={`تاریخ انتشار: ${new Date().toLocaleString("fa-IR")}`}
          />
        </div>
        {preview && (
            <img
              src={preview as string}
              className="rounded-lg"
              alt="article-cover"
            />
        )}
        <p>{methods.getValues("description")}</p>
        <FroalaEditorView model={model} />
      </div>
    </div>
  );
}

export { ArticlePreview };

