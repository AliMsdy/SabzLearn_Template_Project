import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

//constants
import {
  addNewSessionInputList,
  addSessionValidationSchema,
} from "@/constants/formInputsInformation";

//components
import { Button, Input, SimpleLoading } from "@/Components";
import { FileUploader, Section } from "@/Components/AdminPanel";

//api
import { useMutateCall, useQueryCall } from "@/hooks";

//utils
import { fetchAndUpdateInputList } from "@/utils/fetchAndSetInputListData";

//context
import { useAuthContext } from "@/context/AuthContext";

//icons
import { FaPlus } from "react-icons/fa6";

//types
import { AddNewSessionInputTypes, InputListType } from "@/types/shared";
import type { ObjectSchema } from "yup";

function AddNewSession() {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [completeInputList, setCompleteInputList] = useState<InputListType[][]>(
    [],
  );

  const methods = useForm<AddNewSessionInputTypes>({
    resolver: yupResolver(
      addSessionValidationSchema as ObjectSchema<AddNewSessionInputTypes>,
    ),
    defaultValues: {
      title: "",
      relatedCourse: "",
      time: "",
      video: "",
      free: "0",
    },
  });

  const { data: courses = [], isLoading } = useQueryCall(["Courses"], {
    url: "/courses",
  });
  const { mutate: addNewSession, isPending } = useMutateCall(
    ["registerNewSession"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await queryClient.invalidateQueries({
          queryKey: ["Sessions"],
        });
        toast.success("جلسه جدید با موفقیت ساخته شد.");
        setPreview(null);
        methods.reset();
      },
      onError: () => {
        toast.error("اضافه کردن جلسه با مشکلی مواجه شد.");
      },
    },
  );

  const onSubmit: SubmitHandler<AddNewSessionInputTypes> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "relatedCourse") continue;
      const value = data[key as keyof AddNewSessionInputTypes];
      value instanceof FileList
        ? formData.append(key, value[0])
        : formData.append(key, value as string);
    }
    addNewSession({
      url: `/courses/${data.relatedCourse}/sessions`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const radioInputsMarkUp = (inputInfo: InputListType) => {
    return (
      <div>
        <h2 className="mb-2">وضعیت پولی یا رایگان بودن جلسه</h2>
        <div className="flex gap-7">
          <div className="flex cursor-pointer items-center gap-2">
            <label className="cursor-pointer" htmlFor={inputInfo.withMoney?.id}>
              پولی
            </label>
            <input
              type="radio"
              className="cursor-pointer"
              {...inputInfo["withMoney"]}
              {...methods.register("free")}
            />
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <label className="cursor-pointer" htmlFor={inputInfo.free?.id}>
              رایگان
            </label>
            <input
              type="radio"
              className="cursor-pointer"
              {...inputInfo["free"]}
              {...methods.register("free")}
            />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    //adding the courses fetched from api to the select input list
    fetchAndUpdateInputList(
      isLoading,
      courses,
      addNewSessionInputList as InputListType[][],
      setCompleteInputList,
    );
  }, [isLoading, courses]);
  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">جلسه</span> جدید
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
                        title="آپلود ویدیو جلسه"
                        fieldValue="video"
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
            <div>{isPending ? "در حال ارسال اطلاعات " : "افزودن جلسه"}</div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { AddNewSession };
