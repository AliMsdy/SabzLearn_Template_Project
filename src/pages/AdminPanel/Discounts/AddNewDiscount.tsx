import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

//constants
import {
  addNewDiscountInputList,
  addDiscountValidationSchema,
} from "@/constants/formInputsInformation";

//components
import { Button, Input, SimpleLoading } from "@/Components";
import { Section } from "@/Components/AdminPanel";

//api
import { useMutateCall, useQueryCall } from "@/hooks";

//utils
import { fetchAndUpdateInputList } from "@/utils/fetchAndSetInputListData";

//context
import { useAuthContext } from "@/context/AuthContext";

//icons
import { FaPlus } from "react-icons/fa6";

//types
import { AddNewDiscountInputTypes, InputListType } from "@/types/shared";

function AddNewDiscount() {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [completeInputList, setCompleteInputList] = useState<InputListType[][]>(
    [],
  );

  const methods = useForm<AddNewDiscountInputTypes>({
    resolver: yupResolver(
      addDiscountValidationSchema,
    ),
    defaultValues: {
      code: "",
      percent: "",
      max: "",
      course: "",
    },
  });

  const { data: courses = [], isLoading } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  const { mutate: addNewDiscount, isPending } = useMutateCall(
    ["addNewDiscount"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await queryClient.invalidateQueries({
          queryKey: ["Discounts"],
        });
        toast.success("کد تخفیف با موفقیت ثبت شد.");
        methods.reset();
      },
      onError: () => {
        toast.error("ثبت شدن کد تخفیف با مشکلی مواجه شد.");
      },
    },
  );

  const onSubmit: SubmitHandler<AddNewDiscountInputTypes> = (data) => {
    addNewDiscount({
      url: "/offs",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    //adding the courses fetched from api to the select input list
    fetchAndUpdateInputList(
      isLoading,
      courses,
      addNewDiscountInputList,
      setCompleteInputList,
    );
  }, [isLoading, courses]);
  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">کد تخفیف</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10  md:flex-row">
            {completeInputList.map((inputArray, index) => {
              return (
                <div className="flex flex-col gap-4 md:w-1/2 " key={index}>
                  {inputArray.map((input) => (
                    <Input key={input.name} {...input} />
                  ))}
                </div>
              );
            })}
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
            <div>{isPending ? "در حال ارسال اطلاعات " : "افزودن کد تخفیف"}</div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { AddNewDiscount };
