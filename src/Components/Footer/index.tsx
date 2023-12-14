import { Link } from "react-router-dom";

const LastArticles = [
  {
    title: "نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون",
    path: "/#",
  },
  {
    title: "چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون",
    path: "/#",
  },
  {
    title:
      "آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به گام و تصویری",
    path: "/#",
  },
  {
    title:
      "بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی معایب و مزایا",
    path: "/#",
  },
  {
    title: "معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش رایگان",
    path: "/#",
  },
];
const QuickAccess = [
  { title: "آموزش HTML", path: "/#" },
  { title: "آموزش جاوااسکریپت", path: "/#" },
  { title: "آموزش ریکت", path: "/#" },
  { title: "آموزش CSS", path: "/#" },
  { title: "آموزش بوت استرپ", path: "/#" },
  { title: "آموزش پایتون", path: "/#" },
];

function FooterTitle({ title }: { title: string }) {
  return (
    <p className="relative mb-8 w-max text-xl font-bold after:absolute after:right-[50%] after:h-[2.5rem] after:w-[2.5rem] after:translate-x-[50%] after:rotate-45 after:rounded-lg after:bg-primary-color after:opacity-40">
      {title}
    </p>
  );
}

function Footer() {
  return (
    <footer className=" mt-20">
      <div className="lg container relative mx-auto grid max-w-[90%] grid-cols-1 gap-x-6 gap-y-4 rounded-xl bg-[#f0f2f7] px-8 py-6 after:absolute after:-bottom-4 after:right-1/2 after:-z-10 after:h-6 after:w-1/2 after:min-w-[70%] after:translate-x-1/2 after:rounded-b-3xl after:bg-primary-color md:max-w-[85%] md:grid-cols-2 xl:grid-cols-3">
        <div>
          <FooterTitle title="درباره ما" />
          <p className="text-justify text-[#7d7e7f]">
            وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در
            فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود
            که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل
            قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب امروز
            آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت
            میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره
            و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به این معنی هست
            که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو بسیار مهمه! ما در
            آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که
            مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه
            دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته باشند !
          </p>
        </div>
        <div>
          <FooterTitle title="آخرین مطالب" />
          {LastArticles.map(({ title, path }) => (
            <Link key={title} className="mb-4 block" to={path}>
              {title}
            </Link>
          ))}
        </div>
        <div>
          <FooterTitle title="دسترسی سریع" />
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              {Array.from(QuickAccess.slice(0, 3)).map(({ title, path }) => (
                <Link className="mb-3 block" to={path} key={title}>
                  {title}
                </Link>
              ))}
            </div>
            <div>
              {Array.from(QuickAccess.slice(3)).map(({ title, path }) => (
                <Link className="mb-3 block" to={path} key={title}>
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 bg-[#f0f2f7] p-8">
        <p className="text-center font-bold text-dark-color">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی <Link to="/#" className="text-primary-color hover:text-primary-color">سبزلرن</Link>{" "}
          محفوظ است
        </p>
      </div>
    </footer>
  );
}

export { Footer };