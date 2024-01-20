import { sendCommentSchema } from "@/constants/formInputsInformation";
import { useAuthContext } from "@/context/AuthContext";
import { SendCommentRules } from "@/shared/Lists";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
//component
import { Button, Input, SimpleLoading } from "..";

//icon
import { FaCheck } from "react-icons/fa6";
// api
import { useMutateCall } from "@/hooks";

const optionsList = [
  { title: "امتیاز خود را وارد کنید", value: "", disabled: true },
  { title: "1", value: "1" },
  { title: "2", value: "2" },
  { title: "3", value: "3" },
  { title: "4", value: "4" },
  { title: "5", value: "5" },
];

type InputTypes = {
  textArea: string;
  score: string;
};

function SendCommentBox() {
  const { token, isLoggedIn } = useAuthContext();
  const { courseName } = useParams();
  const methods = useForm<InputTypes>({
    resolver: yupResolver(sendCommentSchema),
    defaultValues: {
      textArea: "",
      score: "",
    },
  });
  const { mutate: submitCourseComment, isPending } = useMutateCall(
    ["submitCourseComment"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        methods.reset();
        toast.success(
          "دیدگاه شما با موفقیت ثبت شد و پس از تایید مدیر به نمایش در خواهد آمد",
        );
      },
    },
  );
  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    submitCourseComment({
      url: "/comments",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        body: data.textArea,
        score: data.score,
        courseShortName: courseName,
      },
    });
  };
  if (!isLoggedIn) {
    return (
      <div className="mt-10 text-center">
        <p>
          برای ثبت کامنت باید{" "}
          <Link to="/login" className="text-[#1e83f0]">
            وارد سایت
          </Link>{" "}
          شوید
        </p>
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-lg pr-2 dark:bg-dark-theme-secondary">
      <div className="px-4 py-2">
        <p>قوانین ثبت دیدگاه</p>
        <div className="mt-4 space-y-2 text-sm text-secondary-color dark:text-white ">
          {SendCommentRules.map((rule) => (
            <p key={rule} className="flex items-center gap-3">
              <FaCheck className="min-w-[20px] text-lg text-primary-color" />
              <span>{rule}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-md bg-gray-color p-4 dark:bg-dark-theme-secondary">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <label htmlFor="score">امتیاز شما</label>
            <Input
              element="select"
              id="score"
              options={optionsList}
              name="score"
              className="mb-6"
            />
            <label htmlFor="textArea">دیدگاه شما</label>
            <Input
              placeholder="دیدگاه خود را بنویسید..."
              rows={10}
              element="textarea"
              name="textArea"
              id="textArea"
            />
            <Button disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-3">
                  در حال ثبت
                  <SimpleLoading className="h-6 w-6" />
                </span>
              ) : (
                "ثبت دیدگاه"
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export { SendCommentBox };
