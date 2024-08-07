import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

//icons
import { FaArrowLeft, FaSearch } from "react-icons/fa";

//components
import {
  ArticleBox,
  Button,
  CourseBox,
  LandingCountUp,
  SectionHeader,
  Slider,
} from "@/Components";

//lists
import { LandingSvgList, SabzlearnFeatures } from "@/shared/Lists";
//api
import { useQueryCall } from "@/hooks";

//types
import type {
  ArticleType,
  CourseType,
  LandingCountUptype,
} from "@/types/shared";

type generalDataType = {
  coursesCount: number;
  usersCount: number;
  totalTime: number;
};

function HomePage() {
  console.log("this is base url", import.meta.env.VITE_BASE_URL);
  console.log("this is api url", import.meta.env.VITE_API_URL);
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [landingFullSvgList, setLandingFullSvgList] = useState<
    LandingCountUptype[]
  >([]);
  const queryClient = useQueryClient();
  const generalSiteData: generalDataType | undefined = queryClient.getQueryData(
    ["generalSiteData"],
  );
  const { data: courses = [] } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  const { data: articles = [] } = useQueryCall(["Articles"], {
    url: "/articles",
  });
  const { data: popularCourses = [] } = useQueryCall(["PopularCourses"], {
    url: `/courses/popular`,
  });
  const { data: presellCourses = [] } = useQueryCall(["PresellCourses"], {
    url: `/courses/presell`,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (generalSiteData !== undefined) {
      const updateLandingSvgList = LandingSvgList.map((item) => {
        return {
          ...item,
          numberValue: generalSiteData?.[item.key as keyof generalDataType],
        };
      });
      setLandingFullSvgList(updateLandingSvgList);
    }
  }, [generalSiteData]);
  return (
    <>
      {/* HERO SECTION START */}
      <section>
        <div className="flex h-[calc(100dvh-5dvh)]  w-full flex-col items-center justify-center bg-landing-pattern bg-cover bg-fixed bg-center bg-no-repeat text-white sm:h-screen">
          <h2 className="px-4 text-center text-2xl font-bold md:text-4xl">
            <Typewriter
              options={{
                delay: 80,
                deleteSpeed: 10,
                strings: [
                  `<strong class="text-primary-color text-5xl">سبزلرن</strong> - آکادمی خصوصی برنامه نویسی`,
                  "ما به هر قیمتی دوره آموزشی تولید نمیکنیم !",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
          <h3 className="my-6 px-4 text-center text-lg font-semibold md:text-xl">
            با آکادمی سبزلرن، برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search/${searchBoxValue}`);
            }}
            className="flex min-w-[300px] justify-between gap-x-2 rounded-md bg-white p-2 px-3 sm:min-w-[500px]"
          >
            <input
              className="flex-grow text-black focus:outline-none"
              type="text"
              placeholder="چه چیزی دوست داری یاد بگیری..."
              value={searchBoxValue}
              onChange={(e) => setSearchBoxValue(e.target.value)}
              spellCheck="false"
            />
            <Button className="px-2" type="submit">
              <FaSearch size={30} />
            </Button>
          </form>
          <div className="mt-10 hidden justify-between gap-x-32 px-4 sm:flex">
            {landingFullSvgList.map((item) => (
              <LandingCountUp {...item} key={item.key} />
            ))}
          </div>
        </div>
      </section>
      {/* HERO SECTION END */}
      <div className="custom-container">
        {/* LATEST COURSES SECTION START */}
        <section>
          <div className="mt-10 flex flex-col gap-y-6 sm:flex-row">
            <SectionHeader
              title="جدیدترین دوره ها"
              desc="سکوی پرتاپ شما به سمت موفقیت"
            />
            <div className="flex flex-grow items-center justify-center sm:justify-end">
              <Button component="link" to="/all-courses" className="gap-x-2">
                <span>تمامی دوره</span>
                <FaArrowLeft />
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((courseInfo: CourseType) => (
              <CourseBox {...courseInfo} key={courseInfo._id} />
            ))}
          </div>
        </section>
        {/* LATEST COURSES SECTION END */}

        {/* ABOUT US START */}
        <section>
          <div className="mt-10">
            <SectionHeader
              title="ما چه کمکی بهتون میکنیم"
              desc="از اونجایی که آکادمی سبزلرن یک آکادمی خصوصی هست"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-10 gap-y-8 md:grid-cols-2">
            {SabzlearnFeatures.map(({ title, desc, Icon }) => (
              <div
                key={title}
                className="flex min-h-[10rem] items-center gap-x-4 rounded-md p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.3)] dark:bg-dark-theme-secondary"
              >
                <div className="text-[#666] dark:text-white">
                  <Icon size={65} />
                </div>
                <div>
                  <p className="mb-2 text-xl">{title}</p>
                  <p className="text-justify">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ABOUT US END */}

        {/* MOST POPULAR COURSES START */}
        <section>
          <div className="mt-16">
            <SectionHeader title="محبوبترین دوره ها" />
          </div>
          <Slider list={popularCourses} />
        </section>
        {/* MOST POPULAR COURSES START */}
        {/* PRE-SALE COURSES START */}
        <section>
          <div className="mt-16">
            <SectionHeader title="دوره های در حال پیش فروش" />
          </div>
          <Slider list={presellCourses} />
        </section>
        {/* PRE-SALE COURSES END */}

        {/* ARTICLE SECTION START */}
        <section>
          <div className="mt-10 flex flex-col gap-y-6 sm:flex-row">
            <div>
              <SectionHeader
                title="جدیدترین مقاله ها"
                desc="پیش به سوی ارتقاء دانش"
              />
            </div>
            <div className="flex flex-grow items-center justify-center sm:justify-end">
              <Button component="link" to="/all-articles" className="gap-x-2">
                <span>تمامی مقاله ها</span>
                <FaArrowLeft />
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1  gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles
              .filter((article: ArticleType) => article.publish)
              .slice(0, 3)
              .map((article: ArticleType) => (
                <ArticleBox key={article._id} {...article} />
              ))}
          </div>
        </section>
        {/* ARTICLE SECTION END */}
      </div>
    </>
  );
}

export { HomePage };
