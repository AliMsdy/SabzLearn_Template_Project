import { Link } from "react-router-dom";
//icon
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

//api
import { useQueryCall } from "@/hooks";

function TopBar() {
  const { data: TopBarLinks = [] } = useQueryCall(["TopBarLinks"], {
    url: "/menus/topbar",
  });

  const { data: generaData = {} } = useQueryCall(["generalSiteData"], {
    url: "/infos/index",
  });
  const getRandomItemFromArray = (arr: [], itemNumber: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, itemNumber);
  };

  return (
    <section className="mb-8 flex justify-center bg-gray-color p-4 dark:bg-dark-theme-primary lg:justify-normal lg:p-6">
      <div className="lg:flex-grow">
        <ul className="flex flex-wrap gap-3">
          {getRandomItemFromArray(TopBarLinks, 5).map(
            ({ href, title, _id }) => (
              <li key={_id}>
                <Link className="block text-center" to={href}>
                  {title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="hidden gap-x-4 lg:flex">
        <div className="flex items-center gap-x-2">
          <Link to={`mailto:${generaData?.email}`}>{generaData?.email}</Link>
          <FaEnvelope size={20} className="text-primary-color" />
        </div>
        <div className="flex items-center gap-x-2">
          <Link to={`tel:+98${generaData?.phone}`}>{generaData?.phone}</Link>
          <FaPhoneAlt size={20} className="text-primary-color" />
        </div>
      </div>
    </section>
  );
}

export { TopBar };
