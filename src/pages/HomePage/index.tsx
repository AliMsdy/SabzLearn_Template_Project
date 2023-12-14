import myTailwindConfig from "@/../tailwind.config.ts";
import resolveConfig from "tailwindcss/resolveConfig";
import Typewriter from "typewriter-effect";

//SVG files
import BookLogo from "@/assets/images/svgs/book.svg";
import ClockLogo from "@/assets/images/svgs/clock.svg";
import StudentLogo from "@/assets/images/svgs/student.svg";

//icons
import {
  FaArrowLeft,
  FaGem,
  FaLeaf,
  FaRegCopyright,
  FaSearch,
} from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";

//images/courses
import FreelanceProjects from "@/assets/images/courses/fareelancer.png";
import DjangoCourse from "@/assets/images/courses/jango.png";
import JSprojects from "@/assets/images/courses/js_project.png";
import NodeJSCourse from "@/assets/images/courses/nodejs.png";
import PythonCourse from "@/assets/images/courses/python.png";
import YoutuberCourse from "@/assets/images/courses/youtuber.png";

//images/articles
import Pic1 from "@/assets/images/blog/1.jpg";
import Pic3 from "@/assets/images/blog/3.jpg";
import Pic2 from "@/assets/images/blog/4.png";

//components
import {
  ArticleBox,
  CourseBox,
  LandingCountUp,
  SectionHeader,
  Slider,
} from "@/Components";

const LandingSvgList = [
  {
    numberValue: 5_071,
    subTitle: "کاربر توی سبزلرن ثبت نام کردن",
    svgSrc: StudentLogo,
  },
  { numberValue: 40, subTitle: "دوره آموزشی داریم", svgSrc: BookLogo },
  {
    numberValue: 31_320,
    subTitle: "دقیقه آموزش تولید کردیم",
    svgSrc: ClockLogo,
  },
];

const CourseList = [
  {
    title: "تکنیک های قیمت گذاری پروژه های فریلنسری",
    teacher: "قدیر یلمه",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: FreelanceProjects,
    path: "/#",
  },
  {
    title: "دوره پروژه محور متخصص جنگو",
    teacher: "رضا دولتی",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: DjangoCourse,
    path: "/#",
  },
  {
    title: "دوره های پروژه های تخصصی جاوااسکریپت",
    teacher: "محمد امین سعیدی راد",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: JSprojects,
    path: "/#",
  },
  {
    title: "دوره یوتیوبر",
    teacher: "قدیر یلمه",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: YoutuberCourse,
    path: "/#",
  },
  {
    title: " دوره مصور سازی داده ها با پایتون",
    teacher: "رضا دولتی",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: PythonCourse,
    path: "/#",
  },
  {
    title: "دوره API نویسی با Node JS",
    teacher: "محمد امین سعیدی راد",
    price: 1000000,
    numberOfStudents: 500,
    imgSrc: NodeJSCourse,
    path: "/#",
  },
];

const SabzlearnFeatures = [
  {
    title: "دوره های اختصاصی",
    desc: "با پشتیبانی و کیفیت بالا ارائه میده !",
    Icon: FaRegCopyright,
  },
  {
    title: "اجازه تدریس",
    desc: "به هر مدرسی رو نمیده. چون کیفیت براش مهمه !",
    Icon: FaLeaf,
  },
  {
    title: "دوره پولی و رایگان",
    desc: "براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده",
    Icon: FaGem,
  },
  {
    title: "اهمیت به کاربر",
    desc: "اولویت اول و آخر آکادمی آموزش برنامه نویسی سبزلرن اهمیت به کاربرها و رفع نیازهای آموزشی و رسوندن اونها به بازار کار هست",
    Icon: FaCrown,
  },
];

const ArticleList = [
  {
    title: "نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون",
    desc: "زبان پایتون هم مانند دیگر زبان­های برنامه نویسی رایج، دارای کتابخانه های مختلفی برای تسریع",
    Img: Pic1,
    path: "/#",
  },
  {
    title: "آموزش کار با لایبرری های مختلف در JS",
    desc: "در این مقاله به آموزش چندین کتابخانه معروف جاوااسکریپت پرداخته شده است",
    Img: Pic3,
    path: "/#",
  },
  {
    title: "آموزش کار با API در جاوااسکریپت",
    desc: "در این آموزش به نحوه تعامل با سرور و دریافت داده از آن پرداخته شده است",
    Img: Pic2,
    path: "/#",
  },
];
function HomePage() {
  const tailwindConfig = resolveConfig(myTailwindConfig);

  return (
    <main>
      {/* HERO SECTION START */}
      <section>
        <div className="flex h-[calc(100vh-5vh)]  w-full flex-col items-center justify-center bg-landing-pattern bg-cover bg-fixed bg-center bg-no-repeat text-white sm:h-screen">
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
            <button className=" rounded-md bg-primary-color p-2 text-white">
              <FaSearch size={30} />
            </button>
          </div>
          <div className="mt-10 hidden justify-between gap-x-32 px-4 sm:flex">
            {LandingSvgList.map((item) => (
              <LandingCountUp {...item} key={item.numberValue} />
            ))}
          </div>
        </div>
      </section>
      {/* HERO SECTION END */}

      <div className="container mx-auto max-w-[90%] md:max-w-[85%] ">
        {/* COURSE SECTION START */}
        <section>
          <div className="mt-10 flex flex-col gap-y-6 sm:flex-row">
            <SectionHeader
              title="جدیدترین دوره ها"
              desc="سکوی پرتاپ شما به سمت موفقیت"
            />
            <div className="flex flex-grow items-center justify-center sm:justify-end">
              <button className="flex items-center gap-x-2 rounded-md bg-primary-color p-2 px-4 text-white">
                <span>تمامی دوره</span>
                <FaArrowLeft />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {CourseList.map((courseInfo) => (
              <CourseBox {...courseInfo} key={courseInfo.title} />
            ))}
          </div>
        </section>
        {/* COURSE SECTION END */}

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
                className="flex min-h-[10rem] items-center gap-x-4 rounded-md p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
              >
                <div className="text-[#666]">
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
          <Slider list={CourseList} />
        </section>
        {/* MOST POPULAR COURSES START */}

        {/* PRE-SALE COURSES START */}
        <section>
          <div className="mt-16">
            <SectionHeader title="دوره های در حال پیش فروش" />
          </div>
          <Slider list={CourseList} />
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
              <button className="flex items-center gap-x-2 rounded-md bg-primary-color p-2 px-4 text-white">
                <span>تمامی مقاله ها</span>
                <FaArrowLeft />
              </button>
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
    </main>
  );
}

export { HomePage };
