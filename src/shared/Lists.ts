//SVG files
import BookLogo from "/images/svgs/book.svg";
import ClockLogo from "/images/svgs/clock.svg";
import StudentLogo from "/images/svgs/student.svg";

//icons
import { FaGem, FaLeaf, FaRegCopyright } from "react-icons/fa";
import { FaCrown, FaFacebookF, FaTelegram, FaTwitter } from "react-icons/fa6";

const LandingSvgList = [
  {
    subTitle: "کاربر توی سبزلرن ثبت نام کردن",
    svgSrc: StudentLogo,
    key: "usersCount",
  },
  { subTitle: "دوره آموزشی داریم", svgSrc: BookLogo, key: "coursesCount" },
  {
    subTitle: "دقیقه آموزش تولید کردیم",
    svgSrc: ClockLogo,
    key: "totalTime",
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

const socialList = [
  { Icon: FaTelegram, path: "/#" },
  { Icon: FaTwitter, path: "/#" },
  { Icon: FaFacebookF, path: "/#" },
];

const SendCommentRules = [
  "اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش آنلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهید شد",
  "دیدگاه های نامرتبط به دوره تایید نخواهد شد",
  "سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد",
  "از درج دیدگاه های تکراری پرهیز نمایید",
];

export {
  LandingSvgList,
  SabzlearnFeatures,
  SendCommentRules,
  socialList,
};
