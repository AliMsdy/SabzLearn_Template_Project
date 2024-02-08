import {
  addArticleValidationSchema,
  addNewArticleInputList,
} from "@/constants/formInputsInformation";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { toast } from "react-toastify";
//icons
import { FaPlus } from "react-icons/fa6";

//context
import { useAuthContext } from "@/context/AuthContext";

//api
import { useMutateCall, useQueryCall } from "@/hooks";
//components
import { Button, Input, Overlay, SimpleLoading } from "@/Components";
import { AlertDialog, FileUploader, Section } from "@/Components/AdminPanel";
import { ArticlePreview } from "./ArticlePreview";
import { TextEditor } from "./TextEditor";

//type
import { AddNewArticleInputTypes, InputListType } from "@/types/shared";
import type { ObjectSchema } from "yup";

function AddNewArticle() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState(() => {
    return JSON.parse(localStorage.getItem("formData")!)?.body || "";
  });
  const [showArticlePreview, setShowArticlePreview] = useState(false);
  const [completeInputList, setCompleteInputList] = useState<InputListType[][]>(
    [],
  );
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading } = useQueryCall(["Categories"], {
    url: "/category",
  });
  const { mutate: addNewArticle, isPending } = useMutateCall(["registerUser"], {
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await queryClient.invalidateQueries({
        queryKey: ["Articles"],
      });
      toast.success("مقاله مورد نظر با موفقیت ساخته شد.");
      setPreview(null);
      clear();
      setModel("");
      methods.reset();
    },
    onError: () => {
      toast.error("اضافه کردن مقاله با مشکلی مواجه شد.");
    },
  });
  const methods = useForm<AddNewArticleInputTypes>({
    resolver: yupResolver(
      addArticleValidationSchema as ObjectSchema<AddNewArticleInputTypes>,
    ),
    defaultValues: {
      title: "",
      description: "",
      categoryID: "",
      shortName: "",
      cover: "",
      body: "",
    },
  });

  const { watch, setValue } = methods;
  const { clear } = useFormPersist("formData", {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
    exclude: ["cover"],
  });
  const handleAddArticle = () => {
    if (methods.formState.isValid) {
      onSubmit(methods.getValues());
    } else {
      toast.error("لطفا اررور های موجود را برطرف کرده و دوباره امتحان کنید");
      methods.trigger();
    }
    setOpen(false);
  };

  const onSubmit: SubmitHandler<AddNewArticleInputTypes> = (data) => {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key as keyof AddNewArticleInputTypes];
      value instanceof FileList
        ? formData.append(key, value[0])
        : formData.append(key, value as string);
    }
    addNewArticle({
      url: "/articles",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //fetching the categories and include it in form...
  useEffect(() => {
    //adding the categories fetched from api to the select input list
    if (!isLoading) {
      const updatedInputList = addNewArticleInputList.map(
        (inputArray, index) => {
          if (index === 0) {
            const categoryOptions = categories.map(
              ({ title, _id }: { title: string; _id: string }) => ({
                title,
                value: _id,
              }),
            );
            const updatedSelectInput = {
              ...inputArray[2],
              options: [
                {
                  title: "دسته بندی دوره را انتخاب کنید",
                  value: "",
                  disabled: true,
                },
                ...categoryOptions,
              ],
            };
            return [inputArray[0], inputArray[1], updatedSelectInput];
          }
          return inputArray;
        },
      );
      setCompleteInputList(updatedInputList);
    }
  }, [isLoading, categories]);
  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">مقاله</span> جدید
      </h2>

      <FormProvider {...methods}>
        <form className="p-5">
          <div className="flex flex-col gap-10  md:flex-row">
            {completeInputList.map((inputArray, index) => {
              return (
                <div className="flex flex-col gap-4 md:w-1/2" key={index}>
                  {inputArray.map((input) => {
                    return input.type === "file" ? (
                      <FileUploader
                        key={input.id}
                        methods={methods}
                        errors={methods.formState.errors}
                        preview={preview}
                        setPreview={setPreview}
                        isForArticle
                        {...input}
                      />
                    ) : (
                      <Input key={input.name} {...input} />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="my-4 mt-8 font-vazir">
            <h3 className="mb-3 font-lalehzar">بدنه مقاله</h3>
            <div>
              <TextEditor model={model} setModel={setModel} methods={methods} />
              <ErrorMessage
                errors={methods.formState.errors}
                name="body"
                render={({ message }) => (
                  <div className="py-1 pr-4 font-lalehzar text-red-700">
                    {message}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-evenly">
            <AlertDialog
              open={open}
              setOpen={setOpen}
              message="آیا از ثبت این مقاله مطمئن هستید؟"
              clickHandler={handleAddArticle}
              AlertTrigger={
                <Button
                  disabled={isPending}
                  className="relative  bg-admin-blue-color pr-12"
                >
                  {isPending ? (
                    <SimpleLoading className="absolute right-4 h-6 w-6" />
                  ) : (
                    <FaPlus size={18} className="absolute right-4" />
                  )}
                  <div>{isPending ? "در حال ثبت مقاله " : "افزودن مقاله"}</div>
                </Button>
              }
            />

            <Button
              className="p-2 py-0"
              variant="unfilled"
              type="button"
              onClick={() => {
                setShowArticlePreview(true);
              }}
            >
              مشاهده پیش نویس مقاله
            </Button>
          </div>
        </form>
      </FormProvider>
      {showArticlePreview && (
        <ArticlePreview
          setShowArticlePreview={setShowArticlePreview}
          methods={methods}
          preview={preview}
          model={model}
          categories={categories}
        />
      )}
      <Overlay
        showOverlay={showArticlePreview}
        setStateFunc={setShowArticlePreview}
      />
    </Section>
  );
}

export { AddNewArticle };
