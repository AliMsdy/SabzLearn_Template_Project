import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

//components
import { Button, Input, SimpleLoading } from "@/Components";
import { Section } from "@/Components/AdminPanel";

//icons
import { FaPlus } from "react-icons/fa";

//api
import { useMutateCall } from "@/hooks";

//context
import { useAuthContext } from "@/context/AuthContext";
//validation
const AddCampaignDiscountSchema = yup.object().shape({
  discount: yup.string().required("فیلد را تکمیل کنید(الزامی)"),
});

type AddCampaignDiscountInputTypes = {
  discount: string;
};

function CampaignDiscount() {
  const { token } = useAuthContext();
  const methods = useForm<AddCampaignDiscountInputTypes>({
    resolver: yupResolver(AddCampaignDiscountSchema),
    defaultValues: {
      discount: "",
    },
  });

  const { mutate: setCampaignDiscount, isPending } = useMutateCall(
    ["setCampaignDiscount"],
    {
      onSuccess: async () => {
        toast.success("تخفیف مورد نظر با موفقیت اعمال شد");
        methods.reset();
      },
    },
  );
  const onSubmit: SubmitHandler<AddCampaignDiscountInputTypes> = (data) => {
    setCampaignDiscount({
      url: "/offs/all",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        برگذاری <span className="text-admin-blue-color">کمپین</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-x-10  sm:flex-row">
            <div className="sm:w-1/2 ">
              <Input
                type="text"
                name="discount"
                label="درصد تخفیف"
                placeholder="درصد تخفیف را برای اعمال روی دوره ها وارد کنید"
              />
            </div>
          </div>
          <Button
            disabled={isPending}
            className="relative mt-6 bg-admin-blue-color pr-12"
          >
            {isPending ? (
              <SimpleLoading className="absolute right-4 h-6 w-6" />
            ) : (
              <FaPlus size={18} className="absolute right-4" />
            )}
            <div>
              {isPending ? "در حال ارسال اطلاعات به سرور " : "اعمال کد تخفیف"}
            </div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { CampaignDiscount };
