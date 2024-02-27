import { registerToCourseWithOffCodeValidationSchema } from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

//component
import {
  BreadCrumb,
  Button,
  CommentBox,
  CourseDetailBox,
  Input,
  Loading,
  SectionHeader,
  SendCommentBox,
  SidebarBox,
  VideoAccordion,
} from "@/Components";
import { AlertDialog, Modal } from "@/Components/AdminPanel";
import {
  DialogClose,
  DialogFooter,
} from "@/Components/AdminPanel/shadCnComponents/Dialog";
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
import { useMutateCall, useQueryCall } from "@/hooks";

//context
import { useAuthContext } from "@/context/AuthContext";

//type
import { CommentType, CourseType } from "@/types/shared";
import { AxiosError } from "axios";
type registerToCourseInputType = {
  offCode: string;
};

function CoursePage() {
  const { courseName } = useParams();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [isShortLinkCopied, setIsShortLinkCopied] = useState(false);
  const methods = useForm<registerToCourseInputType>({
    resolver: yupResolver(registerToCourseWithOffCodeValidationSchema),
    defaultValues: {
      offCode: "",
    },
  });
  const { mutate: registerToCourse } = useMutateCall(["registerToCourse"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["CourseInfo", courseName],
      });
      toast.success("با موفقیت در دوره ثبت نام شدید");
    },
  });
  const { mutate: checkOffCode } = useMutateCall(
    ["checkOffCodeForRegistration"],
    {
      onSuccess: async (data: any) => {
        const offCodePercent = +data.data.percent;
        registerToCourse({
          url: `/courses/${courseData._id}/register`,
          data: { price: courseData.price * (offCodePercent / 100) },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      },
      onError: (error: AxiosError) => {
        if (error.status === 404) {
          toast.error("کد وارد شده معتبر نیست");
        } else if (error.status === 409) {
          toast.error("کد وارد شده قبلا استفاده شده است");
        } else {
          toast.error((error.response?.data as any).message);
        }
        console.log("errorData", error);
      },
    },
  );
  const { data: courseData, isLoading } = useQueryCall(
    ["CourseInfo", courseName],
    {
      url: `/courses/${courseName}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const { data: relatedCourses = [] } = useQueryCall(
    ["RelatedCourses", courseName],
    {
      url: `/courses/related/${courseName}`,
    },
  );

  const handleRegisterToCourse = () => {
    registerToCourse({
      url: `/courses/${courseData._id}/register`,
      data: { price: courseData.price },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleRegisterUserToCourseWithOffCode: SubmitHandler<
    registerToCourseInputType
  > = (data) => {
    checkOffCode({
      url: `/offs/${data.offCode}`,
      data: { course: courseData._id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="custom-container">
      {/* BREADCRUMB START */}
      <BreadCrumb />
      {/* BREADCRUMB END */}

      {/* COURSE VIDEO AND INTRODUCTION START */}
      <CourseVideoSection
        title={courseData.categoryID.title}
        cover={courseData.cover}
        name={courseData.name}
        desc={courseData.description}
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
              subTitle={
                courseData.isComplete ? "به اتمام رسیده" : " در حال برگذاری"
              }
              Icon={FaGraduationCap}
            />
            <CourseDetailBox
              title="قیمت"
              subTitle={
                courseData.price
                  ? `${courseData.price.toLocaleString()} تومان`
                  : "رایگان"
              }
              Icon={FaClock}
            />
            <CourseDetailBox
              title="آخرین بروزرسانی:"
              subTitle={courseData.updatedAt.slice(0, 10)}
              Icon={FaCalendarDays}
            />
            <CourseDetailBox
              title="روش پشتیبانی:"
              subTitle={courseData.support}
              Icon={FaUser}
            />
            <CourseDetailBox
              title="تخفیف"
              subTitle={`% ${courseData.discount}`}
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
              <img
                src={`${import.meta.env.VITE_SITE_DOMAIN}/1.gif`}
                alt="course-detail-cover"
              />
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
              <img src={`${import.meta.env.VITE_SITE_DOMAIN}/2.jpg`} />
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
              <VideoAccordion
                sessions={courseData.sessions}
                isUserRegistered={courseData.isUserRegisteredToThisCourse}
              />
            </div>
            {/* COURSE VIDEOS END */}
          </div>

          {/* COURSE TEACHER START */}
          <div className="mt-5 rounded-md p-2 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <img
                  className="h-auto w-16 rounded-full"
                  src={`${import.meta.env.VITE_SITE_DOMAIN}${
                    courseData.creator.profile
                  }`}
                  alt="teacher-photo"
                />
                <div>
                  <h3>
                    <Link
                      className="text-secondary-color dark:text-white"
                      to="/#"
                    >
                      {courseData.creator.name}
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
          <div className="mt-8 rounded-md p-2 shadow-custom dark:bg-dark-theme-secondary dark:shadow-dark-theme sm:p-5">
            <div className="flex items-center gap-3">
              <Button>
                <FaRegComment size={25} />
              </Button>
              <h3 className="text-lg">نظرات</h3>
            </div>

            {courseData.comments.length ? (
              <div className="mt-10">
                {courseData.comments.map((comment: CommentType) => (
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
              {courseData.isUserRegisteredToThisCourse ? (
                <Button className="gap-x-4 rounded-lg text-lg">
                  <FaGraduationCap size={35} />
                  شما دانشجوی دوره هستید
                </Button>
              ) : courseData.price === 0 ? (
                <AlertDialog
                  message="آیا از ثبت نام در این دوره مطمئن هستید؟"
                  clickHandler={handleRegisterToCourse}
                  AlertTrigger={
                    <Button className="gap-x-4 rounded-lg text-lg">
                      <FaPen size={35} />
                      ثبت نام
                    </Button>
                  }
                />
              ) : (
                <Modal
                  DialogTriggerElement={
                    <Button className="gap-x-4 rounded-lg text-lg">
                      <FaPen size={35} />
                      ثبت نام
                    </Button>
                  }
                  title="ثبت نام در دوره"
                >
                  <FormProvider {...methods}>
                    <form
                      onSubmit={methods.handleSubmit(
                        handleRegisterUserToCourseWithOffCode,
                      )}
                    >
                      <Input
                        label="کد تخفیف خود را وارد کنید"
                        name="offCode"
                        placeholder="کد تخفیف..."
                        id="offCode"
                        className="mt-4"
                        isValidationStylesEnabled={false}
                      />
                      <div className="mt-4 flex justify-around gap-x-2">
                        <Button className="bg-cyan-700">
                          ثبت نام با کد تخفیف
                        </Button>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={handleRegisterToCourse}
                              className="bg-teal-600"
                            >
                              ثبت نام
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </form>
                  </FormProvider>
                </Modal>
              )}
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
                  {courseData.courseStudentsCount}
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
              <div className="flex items-center justify-between rounded-lg border border-solid border-gray-400 p-2">
                <Button
                  variant="unfilled"
                  className="p-2"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(
                        `https://sabzlearn.ir/course-info/${courseData.shortName}`,
                      )
                      .then(() => {
                        setIsShortLinkCopied(true);
                      });
                  }}
                >
                  {isShortLinkCopied ? "کپی شد" : "کپی لینک"}
                </Button>
                <span className="text-sm text-[#a7a7a7] dark:text-white">
                  https://sabzlearn.ir/course-info/{courseData.shortName}
                </span>
              </div>
            </SidebarBox>
            {/* SHORT LINK START */}

            {/* COURSE SEASONS START */}
            <SidebarBox title="سرفصل های دوره">
              <p>
                برای مشاهده و یا دانلود دوره روی کلمه{" "}
                <Link className="text-[#0000ff]" to="/">
                  لینک
                </Link>{" "}
                کلیک کنید
              </p>
            </SidebarBox>
            {/* COURSE SEASONS END */}

            {/* RELATED COURSES START  */}
            {relatedCourses.length !== 0 && (
              <SidebarBox title="دوره های مرتبط">
                <div className="flex flex-col gap-y-5">
                  {relatedCourses.map(
                    ({ name, cover, shortName }: CourseType) => (
                      <Link
                        key={name}
                        to={`/course-info/${shortName}`}
                        className="flex items-center gap-x-3"
                      >
                        <img
                          className="w-20 rounded-lg"
                          src={`${
                            import.meta.env.VITE_SITE_DOMAIN
                          }/courses/covers/${cover}`}
                          alt="related-courses"
                        />
                        <span className="text-sm text-[#8d8d8d] dark:text-white">
                          {name}
                        </span>
                      </Link>
                    ),
                  )}
                </div>
              </SidebarBox>
            )}

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
