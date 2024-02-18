//components
import {
  addCourseValidationSchema,
  addNewCourseInputList,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

//components
import { Button, Input, SimpleLoading } from "@/Components";
import { FileUploader, Section } from "@/Components/AdminPanel";

//icons
import { FaPlus } from "react-icons/fa6";

//api
import { useMutateCall, useQueryCall } from "@/hooks";

//context
import { useAuthContext } from "@/context/AuthContext";

//utils
import { fetchAndUpdateInputList } from "@/utils/fetchAndSetInputListData";

//type
import { AddNewCourseInputTypes, InputListType } from "@/types/shared";
import type { ObjectSchema } from "yup";

function AddNewCourse() {
  const [completeInputList, setCompleteInputList] = useState<InputListType[][]>(
    [],
  );
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const methods = useForm<AddNewCourseInputTypes>({
    resolver: yupResolver(
      addCourseValidationSchema as ObjectSchema<AddNewCourseInputTypes>,
    ),
    defaultValues: {
      name: "",
      description: "",
      categoryID: "",
      price: "",
      shortName: "",
      cover: "",
      status: "presell",
      support: "",
    },
  });
  const { data: categories = [], isLoading } = useQueryCall(["Categories"], {
    url: "/category",
  });
  const { mutate: addNewCourse, isPending } = useMutateCall(["registerUser"], {
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await queryClient.invalidateQueries({
        queryKey: ["Courses"],
      });
      toast.success("دوره مورد نظر با موفقیت ساخته شد.");
      setPreview(null);
      methods.reset();
    },
    onError: () => {
      toast.error("اضافه کردن دوره با مشکلی مواجه شد.");
    },
  });
  const onSubmit: SubmitHandler<AddNewCourseInputTypes> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof AddNewCourseInputTypes];
      value instanceof FileList
        ? formData.append(key, value[0])
        : formData.append(key, value as string);
    }
    addNewCourse({
      url: "/courses",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    //adding the categories fetched from api to the select input list
    fetchAndUpdateInputList(
      isLoading,
      categories,
      addNewCourseInputList,
      setCompleteInputList,
    );
  }, [isLoading, categories]);
  const radioInputsMarkUp = (inputInfo: InputListType) => {
    return (
      <div>
        <h2 className="mb-2">وضعیت دوره</h2>
        <div className="flex gap-7">
          <div className="flex cursor-pointer items-center gap-2">
            <label className="cursor-pointer" htmlFor={inputInfo.presell?.id}>
              پیش فروش
            </label>
            <input
              type="radio"
              className="cursor-pointer"
              {...inputInfo.presell}
              {...methods.register("status")}
            />
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <label className="cursor-pointer" htmlFor={inputInfo.start?.id}>
              در حال برگذاری
            </label>
            <input
              type="radio"
              className="cursor-pointer"
              {...inputInfo.start}
              {...methods.register("status")}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">دوره</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10  md:flex-row">
            {completeInputList.map((inputArray, index) => {
              return (
                <div className="flex flex-col gap-4 md:w-1/2 " key={index}>
                  {inputArray.map((input) => {
                    return input.type === "file" ? (
                      <FileUploader
                        key={input.id}
                        methods={methods}
                        title="عکس کاور دوره"
                        fieldValue="cover"
                        errors={methods.formState.errors}
                        preview={preview}
                        setPreview={setPreview}
                        {...input}
                      />
                    ) : input.type === "radio" ? (
                      <Fragment key={input.id}>
                        {radioInputsMarkUp({ ...input })}
                      </Fragment>
                    ) : (
                      <Input key={input.name} {...input} />
                    );
                  })}
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
            <div>{isPending ? "در حال ارسال اطلاعات " : "افزودن دوره"}</div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { AddNewCourse };
