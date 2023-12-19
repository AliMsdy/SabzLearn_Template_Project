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


//SVG files
import BookLogo from "@/assets/images/svgs/book.svg";
import ClockLogo from "@/assets/images/svgs/clock.svg";
import StudentLogo from "@/assets/images/svgs/student.svg";

//icons
import {
  FaGem,
  FaLeaf,
  FaRegCopyright,
} from "react-icons/fa";
import { FaCrown,FaFacebookF, FaTelegram, FaTwitter } from "react-icons/fa6";

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
const relatedCoursesList = [
  {
    title: "پروژه های تخصصی با جاوااسکریپت",
    imgSrc: "/src/assets/images/courses/js_project.png",
  },
  {
    title: "تعیین قیمت پروژه های فریلنسری",
    imgSrc: "/src/assets/images/courses/fareelancer.png",
  },
  { title: "دوره Api نویسی", imgSrc: "/src/assets/images/courses/nodejs.png" },
  { title: "متخصص جنگو", imgSrc: "/src/assets/images/courses/jango.png" },
];
const navLinks = [
  { title: "صفحه اصلی", children: [], path: "/" },
  {
    title: "فرانت اند",
    children: [
      { title: "آموزش Html", path: "/html-course" },
      { title: "آموزش Css", path: "/css/course" },
      { title: "آموزش جاوااسکریپت", path: "/#" },
      { title: "آموزش FlexBox", path: "/#" },
      { title: "آموزش جامع ریکت", path: "/#" },
    ],
  },
  {
    title: "امنیت",
    children: [
      { title: "آموزش کالی لینوکس", path: "/#" },
      { title: "آموزش پایتون سیاه", path: "/#" },
      { title: "آموزش جاوااسکریپت سیاه", path: "/#" },
      { title: "آموزش شبکه", path: "/#" },
    ],
  },
  {
    title: "مقالات",
    children: [
      { title: "توسعه وب ", path: "/#" },
      { title: "جاوااسکریپت", path: "/#" },
      { title: "فرانت اند", path: "/#" },
    ],
  },
  {
    title: "پایتون",
    children: [
      { title: "دوره متخصص پایتون", path: "/#" },
      { title: "دوره هوش مصنوعی با پایتون", path: "/#" },
      { title: "دوره متخصص جنگو", path: "/#" },
    ],
  },
  { title: "مهارت های نرم", children: [], path: "/#" },
];

export { ArticleList, CourseList,LandingSvgList,SabzlearnFeatures,socialList,relatedCoursesList,navLinks };
