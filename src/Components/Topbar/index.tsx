import { Link } from "react-router-dom";
//icon
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const TopbarLinks = [
  { id: 1, path: "#", title: "آموزش Html" },
  { id: 2, path: "#", title: "آموزش Css" },
  { id: 3, path: "#", title: "آموزش جاوااسکریپت" },
  { id: 4, path: "#", title: "آموزش بوت استرپ" },
  { id: 5, path: "#", title: "آموزش پایتون" },
  { id: 6, path: "#", title: "آموزش ریکت" },
];

function Topbar() {
  return (
    <section className="bg-gray-color mb-8 dark:bg-dark-theme-primary flex justify-center p-4 lg:justify-normal lg:p-6">
      <div className="lg:flex-grow">
        <ul className="flex flex-wrap gap-3">
          {TopbarLinks.map(({ path, title, id }) => (
            <li key={id}>
              <Link className="block text-center" to={path}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden gap-x-4 lg:flex">
        <div className="flex items-center gap-x-2">
          <Link to="mailto:sabzlearn@gmail.com">sabzlearn@gmail.com</Link>
          <FaEnvelope size={20} className="text-primary-color" />
        </div>
        <div className="flex items-center gap-x-2">
          <Link to="tel:+989330065800">09921558293</Link>
          <FaPhoneAlt size={20} className="text-primary-color" />
        </div>
      </div>
    </section>
  );
}

export { Topbar };
