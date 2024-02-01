import { useQueryClient } from "@tanstack/react-query";

import {
  addCategoryValidationSchema,
  addCourseCategoryInputList,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

//components
import { Button, Input, SimpleLoading } from "@/Components";
import { Section } from "@/Components/AdminPanel";

//icons
import { FaPlus } from "react-icons/fa";

//api
import { useMutateCall } from "@/hooks";

//context
import { useAuthContext } from "@/context/AuthContext";


type AddCategoryInputTypes = {
  title: string;
  name: string;
};

function AddCategory() {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const methods = useForm<AddCategoryInputTypes>({
    resolver: yupResolver(addCategoryValidationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      name: "",
    },
  });

  const { mutate: addNewCategory, isPending } = useMutateCall(
    ["addNewCourseCategory"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await queryClient.invalidateQueries({
          queryKey: ["Categories"],
        });
        toast.success("دسته بندی مورد نظر با موفقیت ساخته شد.");
        methods.reset();
      },
    },
  );
  const onSubmit: SubmitHandler<AddCategoryInputTypes> = (data) => {
    addNewCategory({
      url: "/category",
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">دسته بندی</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-x-10  sm:flex-row">
            {addCourseCategoryInputList.map((inputInfo) => (
              <div className="sm:w-1/2 " key={inputInfo.name}>
                <Input {...inputInfo} />
              </div>
            ))}
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
              {isPending ? "در حال ارسال اطلاعات به سرور " : "افزودن دسته بندی"}
            </div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { AddCategory };
