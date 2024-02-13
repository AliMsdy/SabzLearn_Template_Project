import {
  addArticleValidationSchema,
  addNewArticleInputList,
} from "@/constants/formInputsInformation";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
// import useFormPersist from "react-hook-form-persist";
import { toast } from "react-toastify";
//icons
import { FaPlus } from "react-icons/fa6";

//context
import { useAuthContext } from "@/context/AuthContext";

//api
import { useMutateCall, useQueryCall } from "@/hooks";
//components
import { Button, Input, Overlay, SimpleLoading } from "@/Components";
import {
  AlertDialog,
  FileUploader,
  Section,
  TextEditor,
} from "@/Components/AdminPanel";
import { ArticlePreview } from "../ArticlePreview";

//type
import { AddNewArticleInputTypes, InputListType } from "@/types/shared";
import type { ObjectSchema } from "yup";

//utils
import { fetchAndUpdateInputList } from "@/utils/fetchAndSetInputListData";
import { useNavigate, useParams } from "react-router-dom";

const convertImageSourceToDataUrlAndFile = async (
  imageUrl: string,
  fileName: string,
) => {
  try {
    // Fetch the image data
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert the image blob to data URL
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });

    // Convert blob to File
    const file = new File([blob], fileName || "image", { type: blob.type });

    return { dataUrl, file };
  } catch (error) {
    console.error("Error converting image source to data URL and File:", error);
    throw error;
  }
};

function EditArticle() {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
  const [model, setModel] = useState("");
  const [showArticlePreview, setShowArticlePreview] = useState(false);
  const [completeInputList, setCompleteInputList] = useState<InputListType[][]>(
    [],
  );
  const { token } = useAuthContext();
  const { shortName } = useParams();
  const { data: categories = [], isLoading:isCategoriesFetching } = useQueryCall(["Categories"], {
    url: "/category",
  });
  const { data: fetchedArticleData = {}, isLoading: isArticleDataFetching } =
    useQueryCall(["Article", shortName], {
      url: `/articles/${shortName}`,
    });
  const { mutate: addNewArticle, isPending } = useMutateCall(
    ["publishArticle"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        toast.success("مقاله مورد نظر با موفقیت ساخته شد.");
        setPreview(null); // delete article preview image
        setModel(""); // set the TextEditor state to empty state
        navigate("/admin-panel/articles");
        methods.reset();
      },
      onError: () => {
        toast.error("اضافه کردن مقاله با مشکلی مواجه شد.");
      },
    },
  );
  const { mutate: saveArticleAsDraft } = useMutateCall(["saveArticleAsDraft"], {
    onSuccess: async () => {
      toast.success("مقاله مورد نظر با موفقیت پیش نویس شد.");
    },
    onError: () => {
      toast.error("پیش نویس کردن مقاله با مشکلی مواجه شد.");
    },
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
        : value instanceof File
          ? formData.append(key, value)
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

  const saveArticleDraft = () => {
    if (methods.formState.isValid) {
      const formInputsData = methods.getValues();
      const formData = new FormData();
      for (const key in formInputsData) {
        const value = formInputsData[key as keyof AddNewArticleInputTypes];
        value instanceof FileList
          ? formData.append(key, value[0])
          : value instanceof File
            ? formData.append(key, value)
            : formData.append(key, value as string);
      }
      saveArticleAsDraft({
        url: "/articles/draft",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      toast.error("لطفا اررور های موجود را برطرف کرده و دوباره امتحان کنید");
      methods.trigger();
    }
  };

  useEffect(() => {
    if (!isArticleDataFetching) {
      for (const key in methods.getValues()) {
        if (key === "categoryID") {
          methods.setValue(
            key as keyof AddNewArticleInputTypes,
            fetchedArticleData[key]._id,
          );
          continue;
        }
        if (key === "cover") {
          const imageUrl = `${
            import.meta.env.VITE_SITE_DOMAIN
          }/courses/covers/${fetchedArticleData["cover"]}`;
          convertImageSourceToDataUrlAndFile(imageUrl, "image.jpg")
            .then(({ dataUrl, file }) => {
              setPreview(dataUrl as string);
              methods.setValue("cover", file);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          continue;
        }
        methods.setValue(
          key as keyof AddNewArticleInputTypes,
          fetchedArticleData[key],
        );
      }
      setModel(fetchedArticleData.body);
    }
  }, [fetchedArticleData, isArticleDataFetching]); //eslint-disable-line
  console.log("this is formData", methods.watch());
  useEffect(() => {
    //adding the categories fetched from api to the select input list
    fetchAndUpdateInputList(
      isCategoriesFetching,
      categories,
      addNewArticleInputList,
      setCompleteInputList,
    );
  }, [isCategoriesFetching, categories]);
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
                        title="عکس کاور مقاله"
                        errors={methods.formState.errors}
                        preview={preview}
                        setPreview={setPreview}
                        fieldValue="cover"
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
                  <div>{isPending ? "در حال ثبت مقاله " : "انتشار مقاله"}</div>
                </Button>
              }
            />
            <Button
              className="p-2 py-0"
              type="button"
              onClick={saveArticleDraft}
            >
              ذخیره پیش نویس مقاله
            </Button>
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
          creator={fetchedArticleData.creator.name}
          createdAt={fetchedArticleData.createdAt}
        />
      )}
      <Overlay
        showOverlay={showArticlePreview}
        setStateFunc={setShowArticlePreview}
      />
    </Section>
  );
}

export { EditArticle };
