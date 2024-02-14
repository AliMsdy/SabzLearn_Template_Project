//context
import { Button } from "@/Components";
import { useAuthContext } from "@/context/AuthContext";

const userPanelBoxList = [
  { title: "سفارش ها", link: "orders" },
  { title: "دوره های خریداری شده", link: "user-courses" },
  { title: "کیف پول من", link: "my-wallet" },
  { title: "جزئیات حساب کاربری", link: "user-profile" },
  { title: "تیکت های پشتیبانی", link: "user-tickets" },
];

function MainPage() {
  const { userInfos } = useAuthContext();
  return (
    <section>
      <p>
        سلام{" "}
        <span className="text-primary-color">
          <b>{userInfos?.name}</b>
        </span>{" "}
        ، به پنل کاربری خود خوش آمدید
      </p>
      <p className="mt-4 text-justify">
        از طریق پیشخوان حساب کاربری تان ، میتوانید سفارش های اخیرتان را مشاهده ،
        آدرس های حمل و نقل و صورت حساب تان را مدیریت و جزئیات حساب کاربری و کلمه
        عبور خود را ویرایش کنید.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {userPanelBoxList.map(({ title, link }) => (
          <Button
            variant="unfilled"
            component="link"
            to={`/my-account/${link}`}
            className="p-4 px-6 text-black dark:text-white"
          >
            {title}
          </Button>
        ))}
      </div>
    </section>
  );
}

export { MainPage };
