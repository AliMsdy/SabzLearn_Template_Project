import {
  contactUsInputList,
  contactUsValidationSchema,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

//component
import { Button, Input, SimpleLoading } from "@/Components";

//icons
import { FaCommentDots } from "react-icons/fa6";

//api
import { useContactUs } from "@/services/mutation";

//type
import { ContactUsInputTypes } from "@/types/shared";

function ContactUs() {
  const { mutateAsync: registerContactUsFormData, isPending } = useContactUs();

  const methods = useForm<ContactUsInputTypes>({
    resolver: yupResolver(contactUsValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      body: "",
    },
  });
  const isFormValid = methods.formState.isValid;
  const onSubmit: SubmitHandler<ContactUsInputTypes> = async (data) => {
     await registerContactUsFormData(data);
     methods.reset()
  };

  return (
    <div className="relative overflow-hidden before:absolute before:-inset-2 before:-top-24 before:-z-10 before:h-[480px] before:w-[150%] before:rotate-[-4deg] before:bg-[#2bce56] after:absolute after:top-0 after:-z-20 after:h-[480px] after:w-[150%]  after:rotate-[-4deg] after:bg-[#2bce5699]">
      <section className=" container mx-auto mt-14 flex max-w-[90%] items-center justify-center sm:max-w-[70%] md:mt-24 ">
        <div className="w-full max-w-[500px] rounded-lg border-b-4 border-solid border-primary-color bg-white p-6 pb-10 shadow-custom dark:bg-dark-theme-secondary">
          <h1 className="mt-3 text-center text-2xl text-secondary-color dark:text-white">
            ارتباط با ما
          </h1>
          <h2 className="mt-2 text-center text-lg text-secondary-color dark:text-white">
            نظر یا انتقادتو برامون بنویس :)
          </h2>

          {/* FORM SECTION START */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="mt-4 flex flex-col gap-y-2"
            >
              {contactUsInputList.map((input) => (
                <Input key={input.name} {...input} />
              ))}
              <Input
                element="textarea"
                placeholder="متن خود را وارد کنید"
                name="body"
                rows={5}
                className="my-2 mb-1 border-2 border-solid dark:border-none"
              />
              <Button
                disabled={!isFormValid || isPending}
                className="relative w-full"
              >
                {isPending ? (
                  <SimpleLoading className="absolute right-4 h-6 w-6" />
                ) : (
                  <FaCommentDots size={18} className="absolute right-4" />
                )}
                <div>{isPending ? "در حال ارسال اطلاعات " : "ارسال"}</div>
              </Button>
            </form>
          </FormProvider>
          {/* FORM SECTION END */}
        </div>
      </section>
    </div>
  );
}

export { ContactUs };
