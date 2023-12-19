import { Link } from "react-router-dom";
//component
import { Button, SectionHeader, VideoAccordion } from "@/Components";

//icons
import { FaEye, FaInfoCircle } from "react-icons/fa";
import {
  FaAngleLeft,
  FaCalendarDays,
  FaChalkboardUser,
  FaChartLine,
  FaClock,
  FaComments,
  FaFacebookF,
  FaGraduationCap,
  FaHouse,
  FaLink,
  FaPlay,
  FaTelegram,
  FaTwitter,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa6";

//style
import "./style.css";

const breadcrumbList = [
  "خانه",
  "آموزش برنامه نویسی فرانت اند",
  "دوره متخصص جاوااسکریپت",
];

const socialList = [
  { Icon: FaTelegram, path: "/#" },
  { Icon: FaTwitter, path: "/#" },
  { Icon: FaFacebookF, path: "/#" },
];

const courseInfoList = [
  { title: "وضعیت دوره:", subTitle: "به اتمام رسیده", Icon: FaGraduationCap },
  { title: "مدت زمان دوره:", subTitle: "19 ساعت", Icon: FaClock },
  { title: "آخرین بروزرسانی:", subTitle: "1401/03/02", Icon: FaCalendarDays },
  { title: "روش پشتیبانی:", subTitle: "آنلاین", Icon: FaUser },
  { title: "پیش نیاز:", subTitle: "HTML CSS", Icon: FaInfoCircle },
  { title: "نوع مشاهده:", subTitle: "ضبط شده / آنلاین", Icon: FaPlay },
];

function CoursePage() {
  return (
    <section className="custom-container">
      {/* BREADCRUMB START */}
      <div className="hidden items-center gap-x-4  rounded-md bg-gray-color p-3 sm:flex">
        <div className="inline-block rounded-md bg-white p-2 text-[#909aa7]">
          <FaHouse size={25} />
        </div>
        <ul className="flex gap-x-1 ">
          {breadcrumbList.map((item, index) => (
            <Link
              to="/#"
              key={item}
              className="flex items-center gap-x-1 text-[#7f8187] hover:text-[#7f818]"
            >
              {item}
              {breadcrumbList.length - 1 === index ? null : (
                <FaAngleLeft size={15} />
              )}
            </Link>
          ))}
        </ul>
      </div>
      {/* BREADCRUMB END */}
      {/* COURSE VIDEO AND INTRODUCTION START */}
      <div className="mt-16 grid grid-cols-1 gap-6 gap-y-8 rounded-md p-4 shadow-custom lg:grid-cols-2">
        <div className="order-2 flex flex-col gap-y-6 lg:order-1">
          <Link
            to="/#"
            className="w-max rounded-md bg-green-200 p-1 px-2 text-xs text-primary-color"
          >
            آموزش برنامه نویسی فرانت اند
          </Link>
          <h1 className="text-2xl font-bold text-[#464749]">
            آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
          </h1>
          <p className="text-secondary-color">
            امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند. به
            قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با Vanilla
            Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک های موجود
            استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس عالی فرانت اند
            باشید، باید کتابخانه های کاربردی که در بازار کار استفاده می شوند را
            به خوبی بلد باشید
          </p>
          <div className="flex gap-x-5">
            {socialList.map(({ path, Icon }, index) => (
              <Link
                className="text-[#b1bbbf] hover:text-[#1e83f0]"
                key={index}
                to={path}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="flex h-full items-center">
            <video
              className="w-full rounded-lg"
              poster="/src/assets/images/courses/js_project.png"
              controls
            ></video>
          </div>
        </div>
      </div>
      {/* COURSE VIDEO AND INTRODUCTION END */}

      {/* COURSE INFO START */}

      {/* <section className="flex flex-wrap items-start gap-5 bg-green-500  lg:flex-nowrap"> */}
      {/* RIGHT SECTION START */}

      {/* <div className="inline-block w-1/2 flex-1 bg-blue-500">
        
      </div> */}
      {/* RIGHT SECTION END */}

      {/* SIDEBAR START */}
      {/* <aside className="sticky top-1  space-y-5 bg-red-500 xl:w-96"></aside> */}
      {/* SIDEBAR END */}
      {/* </section> */}

      {/* COURSE INFO END */}
      {/* </section> */}
      {/* <div className="flex items-start lg:flex-nowrap flex-wrap gap-5"> */}
      <div className="inline-block w-2/3">
        {/* COURSE INFO BOX */}
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          {courseInfoList.map(({ title, subTitle, Icon }) => (
            <div
              key={title}
              className="flex items-center gap-x-4 rounded-lg p-2 py-5 text-sm shadow-custom md:text-base lg:p-4"
            >
              <Icon className="text-primary-color" size={45} />
              <div>
                <p className="text-[#858c96]">{title}</p>
                <p className="mt-1 text-[#7d7e7f]">{subTitle}</p>
              </div>
            </div>
          ))}
        </div>
        {/* COURSE INFO BOX */}

        {/* COURSE PROGRESS START */}
        <div className="mt-8 rounded-lg bg-gray-color p-4">
          <div className="text-secondary-color flex items-center gap-x-5">
            <FaChartLine size={20} />
            <span>درصد پیشرفت دوره : 70 %</span>
          </div>
          <div className="progress mt-4">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={70}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "70%" }}
            />
          </div>
        </div>
        {/* COURSE PROGRESS END */}

        <div className="course-details mt-8 rounded-md p-6 px-6 shadow-custom sm:px-8">
          {/* COURSE DETAILS START */}
          <div>
            <SectionHeader
              className="w-full after:h-[calc(100%-10px)] sm:w-max sm:after:h-2/6"
              title="آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار"
            />
            <img
              src="/src/assets/images/info/1.gif"
              alt="course-detail-cover"
            />
            <p>
              کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و سالانه
              چندین کتابخانه جدید نیز به این لیست اضافه می شود که در بازار کار
              به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این کتابخانه ها
              وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن است ناامید
              شوید!
            </p>
            <p>
              در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های
              جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود تا
              هیچ مشکلی برای ورود به بازار کار نداشته باشید
            </p>
            <SectionHeader
              title="هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)"
              className="mt-6 w-full after:h-[calc(100%-10px)] sm:w-max sm:after:h-2/6"
            />
            <img src="/src/assets/images/info/2.jpg" />
            <p>
              وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از
              کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که من
              اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این
              کتابخانه ها استفاده نکرده بودم.
            </p>
            <p>
              همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم ترین
              مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و کسب
              درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد
            </p>
            <p>
              همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20
              مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت
              است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه
              مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت تر
              یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
            </p>
            <p>
              شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار
              نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد
              بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد. آیا شما باید منتظر
              دوره آموزشی باشید؟! قطعا نه.
            </p>
            <p>
              در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه
              یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد از
              گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر
              کتابخانه جدیدی به دنیای جاوا اسکریپت و وب اضافه شد، به راحتی
              بتوانید آن را یاد بگیرید.
            </p>
          </div>
          {/* COURSE DETAILS END */}

          {/* DOWNLOAD COURSE START */}
          <div className="mt-5 flex flex-col gap-5 gap-y-4 sm:flex-row">
            <Button component="link" to="/#" variant="unfilled">
              دانلود همگانی ویدئو ها
            </Button>
            <Button component="link" to="/#" variant="unfilled">
              دانلود همگانی پیوست ها
            </Button>
          </div>
          {/* DOWNLOAD COURSE END */}

          {/* COURSE VIDEOS START */}
          <div className="mt-8">
            <VideoAccordion />
            <VideoAccordion />
          </div>
          {/* COURSE VIDEOS END */}
        </div>

        {/* COURSE TEACHER START */}
        <div className="mt-5 rounded-md p-5 shadow-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <img
                className="h-auto w-16 rounded-full"
                src="/src/assets/images/info/teacher.jfif"
                alt="teacher-photo"
              />
              <div>
                <h3>
                  <Link className="text-secondary-color" to="/#">
                    محمد امین سعیدی راد
                  </Link>
                </h3>
                <span className="text-secondary-color text-xs">
                  Front End & Back End Developer
                </span>
              </div>
            </div>
            <Button className="hidden gap-x-2 sm:flex">
              <FaChalkboardUser size={25} />
              مدرس
            </Button>
          </div>
          <p className="text-secondary-color mt-4">
            اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با
            زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت
            داشته باشم.و..
          </p>
        </div>
        {/* COURSE TEACHER END */}
      </div>
      <div className="sticky top-1 inline-block w-1/3 bg-red-500">
        <div className="">
          {/* USER STATUS */}
          <div className="flex justify-center rounded-md p-4 shadow-custom">
            <Button className="w-full gap-x-4 rounded-lg text-lg">
              <FaGraduationCap size={35} />
              دانشجوی دوره هستید
            </Button>
          </div>
          {/* USER STATUS */}

          {/* COURSE STATICS START */}
          <div className="mt-8 rounded-md p-4 shadow-custom">
            <div className="flex items-center justify-center gap-2 rounded-lg border border-solid border-gray-400 p-2">
              <FaUserGraduate className="text-[#555555]" size={30} />
              <span className="text-[#7f8187]">تعداد دانشجو: </span>
              <span className="rounded-md bg-[#c4c7cf] p-1 px-3 text-white">
                178
              </span>
            </div>
            <div className="text-secondary-color mt-4 flex justify-between p-2 ">
              <div className="flex w-1/2 items-center justify-center gap-x-3 border-l-2 border-solid border-[#e5e5e5]">
                <FaComments size={20} />
                <span>67 دیدگاه</span>
              </div>

              <div className="flex w-1/2 items-center justify-center gap-x-3">
                <FaEye />
                <span>14,234 بازدید</span>
              </div>
            </div>
          </div>
          {/* COURSE STATICS END */}

          {/* SHORT LINK START */}
          <div className="mt-8 rounded-md p-4 shadow-custom">
            <div className="text-secondary-color flex items-center gap-x-2 text-xl">
              <FaLink size={25} />
              <span className="">لینک کوتاه</span>
            </div>
            <div className="mt-4 rounded-lg border border-solid border-gray-400 p-2">
              <span className="text-sm text-[#a7a7a7]">
                https://sabzlearn.ir/?p=117472
              </span>
            </div>
          </div>
          {/* SHORT LINK START */}

          {/* COURSE SEASONS START */}
          <div className="mt-8 rounded-md p-4 shadow-custom">
            <p className="text-xl text-dark-color">سرفصل های دوره</p>
            <p className="text-[#7d7e7f]">
              برای مشاهده و یا دانلود دوره روی کلمه{" "}
              <Link className="text-[#0000ff]" to="/#">
                لینک
              </Link>{" "}
              کلیک کنید
            </p>
          </div>
          {/* COURSE SEASONS END */}

          {/* RELATED COURSES START  */}
          <div className="mt-8 rounded-md p-4 shadow-custom">
            <p className="text-lg text-dark-color">دوره های مرتبط</p>
            <div className="mt-4 flex flex-col gap-y-5">
              <Link to="/#" className="flex items-center gap-x-3">
                <img
                  className="w-20 rounded-lg"
                  src="/src/assets/images/courses/js_project.png"
                  alt=""
                />
                <span className="text-sm text-[#8d8d8d]">
                  پروژه های تخصصی با جاوااسکریپت
                </span>
              </Link>
              <Link to="/#" className="flex items-center gap-x-3">
                <img
                  className="w-20 rounded-lg"
                  src="/src/assets/images/courses/fareelancer.png"
                  alt=""
                />
                <span className="text-sm text-[#8d8d8d]">
                  تعیین قیمت پروژه های فریلنسری
                </span>
              </Link>
              <Link to="/#" className="flex items-center gap-x-3">
                <img
                  className="w-20 rounded-lg"
                  src="/src/assets/images/courses/nodejs.png"
                  alt=""
                />
                <span className="text-sm text-[#8d8d8d]">دوره Api نویسی</span>
              </Link>
              <Link to="/#" className="flex items-center gap-x-3">
                <img
                  className="w-20 rounded-lg"
                  src="/src/assets/images/courses/jango.png"
                  alt=""
                />
                <span className="text-sm text-[#8d8d8d]">متخصص جنگو</span>
              </Link>
            </div>
          </div>
          {/* RELATED COURSES END  */}
        </div>
      </div>
      {/* </div> */}
      {/* <div className="bg-green-500 h-[2000px]">hoe</div> */}
    </section>
  );
}

export { CoursePage };
