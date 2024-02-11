import { Link, useParams } from "react-router-dom";
//component
import {
  BreadCrumb,
  Button,
  CommentBox,
  CourseDetailBox,
  Loading,
  SectionHeader,
  SendCommentBox,
  SidebarBox,
  VideoAccordion,
} from "@/Components";
import { CourseVideoSection } from "./CourseVideoSection";

//icons
import { FaEye, FaInfoCircle } from "react-icons/fa";
import {
  FaCalendarDays,
  FaChalkboardUser,
  FaChartLine,
  FaClock,
  FaComments,
  FaGraduationCap,
  FaLink,
  FaPen,
  FaPlay,
  FaRegComment,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa6";

//api
import { useQueryCall } from "@/hooks";

//list
import { relatedCoursesList } from "@/shared/Lists";

//type
import { CommentType } from "@/types/shared";

function CoursePage() {
  const { courseName } = useParams();
  const { data, isLoading } = useQueryCall(["CourseInfo", courseName], {
    url: `/courses/${courseName}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
      <section className="custom-container px-0 sm:px-8">
        {/* BREADCRUMB START */}
        <BreadCrumb />
        {/* BREADCRUMB END */}

        {/* COURSE VIDEO AND INTRODUCTION START */}
        <CourseVideoSection
          title={data.categoryID.title}
          cover={data.cover}
          name={data.name}
          desc={data.description}
        />
        {/* COURSE VIDEO AND INTRODUCTION END */}

        {/* MAIN CONTENT START */}
        <div className="mt-16 grid grid-cols-12 gap-x-6">
          {/* RIGHT SECTION START */}
          <div className="col-span-12 lg:col-span-8">
            {/* COURSE INFO BOX */}
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 ">
              <CourseDetailBox
                title="وضعیت دوره:"
                subTitle={data.isComplete ? "به اتمام رسیده" : " در حال برگذاری"}
                Icon={FaGraduationCap}
              />
              <CourseDetailBox
                title="قیمت"
                subTitle={
                  data.price ? `${data.price.toLocaleString()} تومان` : "رایگان"
                }
                Icon={FaClock}
              />
              <CourseDetailBox
                title="آخرین بروزرسانی:"
                subTitle={data.updatedAt.slice(0, 10)}
                Icon={FaCalendarDays}
              />
              <CourseDetailBox
                title="روش پشتیبانی:"
                subTitle={data.support}
                Icon={FaUser}
              />
              <CourseDetailBox
                title="تخفیف"
                subTitle={`% ${data.discount}`}
                Icon={FaInfoCircle}
              />
              <CourseDetailBox
                title="نوع مشاهده:"
                subTitle="آنلاین"
                Icon={FaPlay}
              />
            </div>
            {/* COURSE INFO BOX */}

            {/* COURSE PROGRESS START */}
            <div className="mt-8 rounded-lg bg-gray-color p-4 dark:bg-dark-theme-secondary">
              <div className="flex items-center gap-x-5 text-secondary-color dark:text-white">
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

            <div className="course-details mt-8 rounded-md p-6 px-3 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme sm:px-8">
              {/* COURSE DETAILS START */}
              <div>
                <SectionHeader
                  className="w-full after:h-[calc(100%-10px)] sm:w-max sm:after:h-2/6"
                  title="آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار"
                />
                <img src={`${import.meta.env.VITE_SITE_DOMAIN}/images/1.gif`} alt="course-detail-cover" />
                <p>
                  کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و
                  سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که در
                  بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد بودن این
                  کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید شد و حتی ممکن
                  است ناامید شوید!
                </p>
                <p>
                  در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه های
                  جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده می شود
                  تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                </p>
                <SectionHeader
                  title="هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب درآمد)"
                  className="mt-6 w-full after:h-[calc(100%-10px)] sm:w-max sm:after:h-2/6"
                />
                <img src={`${import.meta.env.VITE_SITE_DOMAIN}/images/2.jpg`} />
                <p>
                  وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم، از
                  کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در حالی که
                  من اولین بارم بود اسم Formik را می شنیدم و تا اون موقع از این
                  کتابخانه ها استفاده نکرده بودم.
                </p>
                <p>
                  همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم
                  ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار کار و
                  کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده باشد
                </p>
                <p>
                  همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش 20
                  مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا اسکریپت
                  است تا شما بتوانید بعد از این دوره با قدرت و آمادگی بیشتر ادامه
                  مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا نود یا … را راحت
                  تر یاد بگیرید و در نهایت وارد بازار کار شده و کسب درآمد کنید.
                </p>
                <p>
                  شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی کار
                  نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه جدید را یاد
                  بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد. آیا شما باید
                  منتظر دوره آموزشی باشید؟! قطعا نه.
                </p>
                <p>
                  در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه، نحوه
                  یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش دهیم تا بعد
                  از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص خاصی نباشید و اگر
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
                <VideoAccordion sessions={data.sessions} isUserRegistered={data.isUserRegisteredToThisCourse} />
              </div>
              {/* COURSE VIDEOS END */}
            </div>

            {/* COURSE TEACHER START */}
            <div className="mt-5 rounded-md p-2 sm:p-5 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <img
                    className="h-auto w-16 rounded-full"
                    src={`${import.meta.env.VITE_SITE_DOMAIN}${
                      data.creator.profile
                    }`}
                    alt="teacher-photo"
                  />
                  <div>
                    <h3>
                      <Link
                        className="text-secondary-color dark:text-white"
                        to="/#"
                      >
                        {data.creator.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-secondary-color dark:text-white">
                      Front End & Back End Developer
                    </span>
                  </div>
                </div>
                <Button className="hidden gap-x-2 sm:flex">
                  <FaChalkboardUser size={25} />
                  مدرس
                </Button>
              </div>
              <p className="mt-4 text-secondary-color dark:text-white">
                اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با
                زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت
                داشته باشم.و..
              </p>
            </div>
            {/* COURSE TEACHER END */}

            {/* COMMENT SECTION START */}
            <div className="mt-8 rounded-md p-2 sm:p-5 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme">
              <div className="flex items-center gap-3">
                <Button>
                  <FaRegComment size={25} />
                </Button>
                <h3 className="text-lg">نظرات</h3>
              </div>

              {data.comments.length ? (
                <div className="mt-10">
                  {data.comments.map((comment: CommentType) => (
                    <CommentBox key={comment._id} {...comment} />
                  ))}
                  {/* <Pagination darkBackground="dark:bg-[#545676]" /> */}
                </div>
              ) : (
                <div className="mt-10 rounded-md bg-gray-400 p-4 text-center text-white">
                  کامنتی برای دوره ثبت نشده هست
                </div>
              )}

              <SendCommentBox />
            </div>

            {/* COMMENT SECTION END */}
          </div>
          {/* RIGHT SECTION END */}

          {/* LEFT SECTION START */}
          <aside className="col-span-4 hidden lg:block ">
            <div className="sticky top-2 space-y-6">
              {/* USER STATUS */}
              <SidebarBox>
                <Button className="gap-x-4 rounded-lg text-lg">
                  {data.isUserRegisteredToThisCourse ? (
                    <>
                      <FaGraduationCap size={35} />
                      شما دانشجوی دوره هستید
                    </>
                  ) : (
                    <>
                      <FaPen size={35} />
                      ثبت نام
                    </>
                  )}
                </Button>
              </SidebarBox>
              {/* USER STATUS */}

              {/* COURSE STATICS START */}
              <SidebarBox>
                <div className="flex items-center justify-center gap-2 rounded-lg border border-solid border-gray-400 p-2">
                  <FaUserGraduate
                    className="text-[#555555] dark:text-white"
                    size={30}
                  />
                  <span className="text-[#7f8187] dark:text-white">
                    تعداد دانشجو:{" "}
                  </span>
                  <span className="rounded-md bg-[#c4c7cf] p-1 px-3 text-white dark:text-dark-color">
                    {data.courseStudentsCount}
                  </span>
                </div>
                <div className="mt-4 flex justify-between p-2 text-secondary-color dark:text-white">
                  <div className="flex w-1/2 items-center justify-center gap-x-3 border-l-2 border-solid border-[#e5e5e5]">
                    <FaComments size={20} />
                    <span>67 دیدگاه</span>
                  </div>

                  <div className="flex w-1/2 items-center justify-center gap-x-3">
                    <FaEye />
                    <span>14,234 بازدید</span>
                  </div>
                </div>
              </SidebarBox>
              {/* COURSE STATICS END */}

              {/* SHORT LINK START */}
              <SidebarBox
                title={
                  <>
                    <FaLink size={25} />
                    <span>لینک کوتاه</span>
                  </>
                }
              >
                <div className="rounded-lg border border-solid border-gray-400 p-2">
                  <span className="text-sm text-[#a7a7a7] dark:text-white">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
              </SidebarBox>
              {/* SHORT LINK START */}

              {/* COURSE SEASONS START */}
              <SidebarBox title="سرفصل های دوره">
                <p>
                  برای مشاهده و یا دانلود دوره روی کلمه{" "}
                  <Link className="text-[#0000ff]" to="/#">
                    لینک
                  </Link>{" "}
                  کلیک کنید
                </p>
              </SidebarBox>
              {/* COURSE SEASONS END */}

              {/* RELATED COURSES START  */}
              <SidebarBox title="دوره های مرتبط">
                <div className="flex flex-col gap-y-5">
                  {relatedCoursesList.map(({ title, imgSrc }) => (
                    <Link
                      key={title}
                      to="/#"
                      className="flex items-center gap-x-3"
                    >
                      <img
                        className="w-20 rounded-lg"
                        src={imgSrc}
                        alt=""
                      />
                      <span className="text-sm text-[#8d8d8d] dark:text-white">
                        {title}
                      </span>
                    </Link>
                  ))}
                </div>
              </SidebarBox>
              {/* RELATED COURSES END  */}
            </div>
          </aside>
          {/* LEFT SECTION END */}
        </div>
        {/* MAIN CONTENT END */}
      </section>
  );
}

export { CoursePage };
