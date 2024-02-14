import { useParams } from "react-router-dom";

//api
import { useQueryCall } from "@/hooks";

//component
import { Button, Loading } from "@/Components";

//context
import { useAuthContext } from "@/context/AuthContext";

function OrderDetail() {
  const { token, userInfos } = useAuthContext();
  const { orderID } = useParams();
  const { data: orderDetail = [], isLoading } = useQueryCall(
    ["OrderDetail", orderID],
    {
      url: `/orders/${orderID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (isLoading) return <Loading />;
  const {
    _id,
    createdAt,
    course: { name },
    price,
  } = orderDetail[0];
  return (
    <div>
      <p>
        سفارش شماره <span className="bg-admin-blue-color">{_id}</span> در تاریخ{" "}
        <mark>{new Date(createdAt).toLocaleDateString("fa-IR")}</mark> ثبت شده
        است و درحال حاضر در وضعیت <mark>تکمیل شده</mark> میباشد.
      </p>

      <h2 className="mt-10 text-2xl font-bold">مشخصات سفارش</h2>

      <ul className="mt-4 w-1/2">
        <li className="flex justify-between border-b border-solid border-gray-300 py-3">
          <span>محصول</span>
          <span>مجموع</span>
        </li>
        <li className="flex justify-between border-b border-solid border-gray-300 py-3">
          <span>{name} * 1</span>
          <span>{price.toLocaleString("fa-IR")} تومان</span>
        </li>
        <li className="flex justify-between border-b border-solid border-gray-300 py-3">
          <span>قیمت کل سبد خرید :</span>
          <span>{price.toLocaleString("fa-IR")} تومان</span>
        </li>
        <li className="flex justify-between border-b border-solid border-gray-300 py-3">
          <span>قیمت نهایی :</span>
          <span>{price.toLocaleString("fa-IR")} تومان</span>
        </li>
      </ul>

      <Button className="mt-6">سفارش دوباره</Button>

      <h2 className="mt-10 text-2xl font-bold">آدرس صورت حساب</h2>
      <div className="mt-4">
        <i>{userInfos?.name}</i>
      </div>
      <div className="mt-1">
        <i>{userInfos?.phone}</i>
      </div>
      <div className="mt-1">
        <i>{userInfos?.email}</i>
      </div>
    </div>
  );
}

export { OrderDetail };
