import { Link, useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
//components
import { BreadCrumb, Loading, SendCommentBox, SidebarBox,ArticleDetail } from "@/Components";

//svg
import StarUnfilled from "/images/svgs/star.svg";
import StarFilled from "/images/svgs/star_fill.svg";

//icons
import { navLinks, relatedCoursesList, socialList } from "@/shared/Lists";
import {
  FaAngleLeft,
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaFolder,
  FaUser,
} from "react-icons/fa6";

//api
import { useQueryCall } from "@/hooks";



const headingList = [
  { title: "معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:", path: "/#" },
  {
    title: "یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!",
    path: "/#",
  },
  { title: "ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:", path: "/#" },
];

function ArticlePage() {
  const { articleName } = useParams();

  const { data, isLoading } = useQueryCall(["ArticleInfo", articleName], {
    url: `/articles/${articleName}`,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="custom-container">
      {/* BREAD CRUMB START */}
      <BreadCrumb />
      {/* BREAD CRUMB END */}

      {/* MAIN CONTENT START */}
      <div className="mt-16 grid grid-cols-12 gap-x-6">
        {/* RIGHT SECTION START */}
        <div className="col-span-12 lg:col-span-8">
          {/* BLOG CONTENT START */}
          <div className="blog-content rounded-lg p-6 px-6 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme sm:px-8">
            <h1>
              {data.title}
            </h1>
            {/* ARTICLE DETAIL START */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-4 text-[0.8rem]">
              <ArticleDetail
                Icon={FaFolder}
                title={`دسته بندی: ${data.categoryID.title}`}
              />
              <ArticleDetail
                Icon={FaUser}
                title={`ارسال شده توسط: ${data.creator.name}`}
              />
              <ArticleDetail
                Icon={FaClock}
                title={`تاریخ انتشار: ${data.createdAt.slice(0, 10)}`}
              />
            </div>
            {/* ARTICLE DETAIL START */}

            <img
              src={`${import.meta.env.VITE_SITE_DOMAIN}/courses/covers/${data.cover}`}
              alt="article-cover"
            />
            {/* STARS START */}
            <div className="mt-8 flex items-center gap-x-4">
              <div className="flex items-start">
                {Array.from(Array(4)).map((_, i) => (
                  <img
                    className="mt-0"
                    key={i}
                    src={StarFilled}
                    alt="rating-star"
                  />
                ))}
                <img className="mt-0" src={StarUnfilled} alt="rating-star" />
              </div>
              <span>4.2/5 - (5 امتیاز)</span>
            </div>
            {/* STARS END */}
            <p>{data.description}</p>

            {/* LINK ACCESS START */}
            <div className="mt-8 flex flex-col gap-y-4 rounded-2xl bg-[#f2f2f2] p-4  dark:bg-dark-theme-secondary">
              <div>آنچه در این مقاله خواهید خواند</div>
              <div className="flex flex-col gap-y-3 ">
                {headingList.map(({ title, path }) => (
                  <Link className="text-[#1e83f0]" key={title} to={path}>
                    {title}
                  </Link>
                ))}
              </div>
            </div>
            {/* LINK ACCESS END */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.body) }} />

            {/* SHARE ARTICLE START */}
            <div className="mt-12 flex items-center gap-x-4">
              <span className="dark:text-white">اشتراک گذاری :</span>
              <div className="flex gap-x-5">
                {socialList.map(({ path, Icon }, index) => (
                  <Link
                    className="text-[#b1bbbf] hover:text-[#1e83f0] dark:text-white dark:hover:text-[#1e83f0]"
                    key={index}
                    to={path}
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
            </div>
            {/* SHARE ARTICLE END */}
          </div>
          {/* BLOG CONTENT END */}
          {/* NEXT AND PREV BLOG START */}
          <div className="bg- mt-12 flex gap-x-8 rounded-lg p-4 dark:bg-dark-theme-secondary sm:p-6">
            <div className="flex flex-col items-end gap-y-4">
              <span className="text-[#adb5db] dark:text-white">قدیمی تر</span>
              <div className="flex items-center justify-between gap-x-2 sm:gap-x-5">
                <Link to="/#">
                  <FaArrowRight className="" size={15} />
                </Link>
                <Link className=" text-center text-[#1e83f0]" to="/#">
                  سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه
                  برنامه نویسان
                </Link>
              </div>
            </div>
            <div className="flex flex-col  gap-y-4">
              <span className="text-[#adb5db] dark:text-white">جدید تر</span>
              <div className="flex items-center justify-between gap-x-2 sm:gap-x-5">
                <Link className=" text-center text-[#1e83f0]" to="/#">
                  سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ | تجربه
                  برنامه نویسان
                </Link>
                <Link to="/#">
                  <FaArrowLeft className="" size={15} />
                </Link>
              </div>
            </div>
          </div>
          {/* NEXT AND PREV BLOG END */}

          {/* COMMENT SECTION START */}
          <SendCommentBox />
          {/* COMMENT SECTION END */}
        </div>

        {/* RIGHT SECTION END */}

        {/* LEFT SECTION START */}
        <div className="col-span-4 hidden lg:block">
          <div className="sticky top-4 space-y-6">
            {/* BEST COURSES SECTION START  */}
            <SidebarBox badge title="پر امتیازترین دوره ها">
              <div className="flex flex-col gap-y-5">
                {relatedCoursesList.map(({ title, imgSrc }) => (
                  <Link
                    key={title}
                    to="/#"
                    className="flex items-center gap-x-3"
                  >
                    <img className="w-20 rounded-lg" src={imgSrc} alt="" />
                    <span className="text-sm text-[#8d8d8d] dark:text-white">
                      {title}
                    </span>
                  </Link>
                ))}
              </div>
            </SidebarBox>
            {/* BEST COURSES SECTION END  */}

            {/* QUICK ACCESS START */}
            <SidebarBox title="دسترسی سریع" badge>
              <div className="mt-1">
                {navLinks.map(({ title }) => (
                  <Link
                    className="group flex items-center gap-x-4 border-b-[1.5px] border-solid border-[#eeeeee;] py-2 text-sm transition-all duration-300 last:border-b-0 hover:bg-[#f8f9fa] hover:pr-3 dark:rounded-md dark:border-b-0 dark:hover:bg-dark-theme-primary"
                    key={title}
                    to="/#"
                  >
                    <FaAngleLeft className="group-hover:text-primary-color " />
                    {title}
                  </Link>
                ))}
              </div>
            </SidebarBox>
            {/* QUICK ACCESS END */}

            {/* LATEST ARTICLES START */}
            <SidebarBox title="مقاله های جدید" badge>
              <div className="mt-1 space-y-3">
                {Array.from(Array(5)).map((_, i) => (
                  <Link
                    className="group flex items-center gap-x-4 border-b-[1.5px] border-solid border-[#eeeeee;] py-2 text-sm transition-all duration-300 last:border-b-0 hover:bg-[#f8f9fa] hover:pr-3 dark:rounded-md dark:border-b-0 dark:hover:bg-dark-theme-primary "
                    key={i}
                    to="/#"
                  >
                    {/* <FaAngleLeft className="group-hover:text-primary-color " /> */}
                    <span>
                      نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                    </span>
                  </Link>
                ))}
              </div>
            </SidebarBox>
            {/* LATEST ARTICLES END */}

            {/* ARTICLE CATEGORY START */}
            <SidebarBox title="دسته بندی مقالات" badge>
              <div className="mt-1">
                {navLinks.map(({ title }) => (
                  <Link
                    className="group flex items-center gap-x-4 border-b-[1.5px] border-solid border-[#eeeeee;] py-2 text-sm transition-all duration-300 last:border-b-0 hover:bg-[#f8f9fa] hover:pr-3 dark:rounded-md dark:border-b-0 dark:hover:bg-dark-theme-primary"
                    key={title}
                    to="/#"
                  >
                    <FaAngleLeft className="group-hover:text-primary-color " />
                    {title}
                  </Link>
                ))}
              </div>
            </SidebarBox>
            {/* ARTICLE CATEGORY END */}

            {/* NEW COURSES START */}
            <SidebarBox title="دوره های جدید" badge>
              <div className="mt-1">
                {navLinks.map(({ title }) => (
                  <Link
                    className="group flex items-center gap-x-4 border-b-[1.5px] border-solid border-[#eeeeee;] py-2 text-sm transition-all duration-300 last:border-b-0 hover:bg-[#f8f9fa] hover:pr-3 dark:rounded-md dark:border-b-0 dark:hover:bg-dark-theme-primary"
                    key={title}
                    to="/#"
                  >
                    <FaAngleLeft className="group-hover:text-primary-color " />
                    {title}
                  </Link>
                ))}
              </div>
            </SidebarBox>
            {/* NEW COURSES END */}
          </div>
        </div>
        {/* LEFT SECTION END */}
      </div>
      {/* MAIN CONTENT END */}
    </section>
  );
}



export { ArticlePage };
