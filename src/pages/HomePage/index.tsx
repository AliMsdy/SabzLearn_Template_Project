import myTailwindConfig from "@/../tailwind.config.ts";
import resolveConfig from "tailwindcss/resolveConfig";
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
import { ArticleList, LandingSvgList, SabzlearnFeatures } from "@/shared/Lists";
//api
import { useCourses } from "@/services/query";

//types
import { CourseType } from "@/types/shared";

const tailwindConfig = resolveConfig(myTailwindConfig);
function HomePage() {
  const { data: courses = [] } = useCourses();
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
                  `<strong style='color:${tailwindConfig.theme.colors["primary-color"]}; font-size: ${tailwindConfig.theme.fontSize["5xl"]}'>سبزلرن</strong> - آکادمی خصوصی برنامه نویسی`,
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
          <div className="flex min-w-[300px] justify-between gap-x-2 rounded-md bg-white p-2 px-3 sm:min-w-[500px]">
            <input
              className="flex-grow text-black focus:outline-none"
              type="text"
              placeholder="چه چیزی دوست داری یاد بگیری..."
            />
            <Button className="px-2">
              <FaSearch size={30} />
            </Button>
          </div>
          <div className="mt-10 hidden justify-between gap-x-32 px-4 sm:flex">
            {LandingSvgList.map((item) => (
              <LandingCountUp {...item} key={item.numberValue} />
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
            {courses.slice(0,6).map((courseInfo: CourseType) => (
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
          <Slider list={courses} />
        </section>
        {/* MOST POPULAR COURSES START */}

        {/* PRE-SALE COURSES START */}
        <section>
          <div className="mt-16">
            <SectionHeader title="دوره های در حال پیش فروش" />
          </div>
          <Slider list={courses} />
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
              <Button className="gap-x-2">
                <span>تمامی مقاله ها</span>
                <FaArrowLeft />
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1  gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {ArticleList.map((article, i) => (
              <ArticleBox key={i} {...article} />
            ))}
          </div>
        </section>
        {/* ARTICLE SECTION END */}
      </div>
    </>
  );
}

export { HomePage };
