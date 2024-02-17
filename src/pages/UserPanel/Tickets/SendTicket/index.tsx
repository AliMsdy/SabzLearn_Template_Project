import {
  addNewTicketInputList,
  sendTicketValidationSchema,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
//icons
import { BsSendFill } from "react-icons/bs";

//context
import { useAuthContext } from "@/context/AuthContext";

//api
import { axiosInstance, useMutateCall, useQueryCall } from "@/hooks";
//components
import { Button, Input, SimpleLoading } from "@/Components";
import { Section } from "@/Components/AdminPanel";
import { UserPanelHeader } from "@/Components/UserPanel";

//type
import { AddNewTicketInputType } from "@/types/shared";

function SendTicket() {
  const { token } = useAuthContext();
  const { data: departments = [], isLoading: isDepartmentsFetching } =
    useQueryCall(["Departments"], {
      url: "/tickets/departments",
    });
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [subDepartmentOptions, setSubDepartmentOptions] = useState([]);
  const [showCoursesField, setShowCoursesField] = useState(false);
  const methods = useForm<AddNewTicketInputType>({
    resolver: yupResolver(sendTicketValidationSchema),
    defaultValues: {
      departmentID: "",
      departmentSubID: "",
      title: "",
      body: "",
      priority: "",
      course: "",
    },
  });
  const {
    data: subDepartments = [],
    isLoading: isSubDepartmentsFetching,
    refetch: fetchSubDepartments,
  } = useQueryCall(
    ["SubDepartments"],
    {},
    {
      enabled: false,
    },
    undefined,
    async () => {
      const { data } = await axiosInstance.request({
        method: "GET",
        url: `/tickets/departments-subs/${methods.getValues("departmentID")}`,
      });
      return data;
    },
  );
  const { data: userCourses = [], refetch: fetchCourses } = useQueryCall(
    ["UserCourses"],
    {
      url: `/users/courses`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      enabled: false,
    },
  );
  const { mutate: sendTicket, isPending } = useMutateCall(["sendTicket"], {
    onSuccess: async () => {
      toast.success("تیکت با موفقیت ارسال شد");
      setShowCoursesField(false);
      setSubDepartmentOptions([]);
      methods.reset();
    },
    onError: () => {
      toast.error("ارسال تیکت با مشکلی مواجه شد.");
    },
  });

  const onSubmit: SubmitHandler<AddNewTicketInputType> = (data) => {
    sendTicket({
      url: "/tickets",
      data: { ...data, course: data.course === "" ? undefined : data.course },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  useEffect(() => {
    // set Department Options list
    if (!isDepartmentsFetching && departments.length !== 0) {
      const DepartmentOptions = departments.map(
        ({ title, _id }: { title: string; _id: string }) => ({
          title,
          value: _id,
        }),
      );
      setDepartmentOptions(DepartmentOptions);
    }
  }, [isDepartmentsFetching, departments]);
  useEffect(() => {
    // set SubDepartment Options list
    if (!isSubDepartmentsFetching && subDepartments.length !== 0) {
      const subDepartmentOptions = subDepartments.map(
        ({ title, _id }: { title: string; _id: string }) => ({
          title,
          value: _id,
        }),
      );
      setSubDepartmentOptions(subDepartmentOptions);
    }
  }, [isSubDepartmentsFetching, subDepartments]);

  return (
    <>
      <UserPanelHeader
        title={
          <h2 className="mt-2 text-2xl">
            ارسال <span className="text-admin-blue-color">تیکت</span> جدید
          </h2>
        }
        buttonContent="همه تیکت ها"
        buttonLink="/my-account/user-tickets"
      />
      <Section>
        <FormProvider {...methods}>
          <form className="p-2" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="mb-6 flex flex-col  gap-8 md:flex-row">
              {addNewTicketInputList.map((inputArray, index) => (
                <div className="flex flex-col gap-4 md:w-1/2" key={index}>
                  {inputArray.map((input) => {
                    const key = input.name || input.label;
                    return input.name === "course" ? (
                      <Fragment key={key}>
                        {showCoursesField && (
                          <Input
                            {...input}
                            options={[
                              ...input.options!,
                              ...userCourses.map(
                                ({
                                  course: { name },
                                  _id,
                                }: {
                                  course: { name: string };
                                  _id: string;
                                }) => ({
                                  title: name,
                                  value: _id,
                                }),
                              ),
                            ]}
                          />
                        )}
                      </Fragment>
                    ) : input.name === "departmentID" ? (
                      <Input
                        {...input}
                        options={[...input.options!, ...departmentOptions]}
                        onChange={async (e) => {
                          methods.setValue("departmentID", e.target.value);
                          await fetchSubDepartments();
                          setShowCoursesField(false);
                          methods.setValue("departmentSubID", "");
                        }}
                        key={key}
                      />
                    ) : input.name === "departmentSubID" ? (
                      <Input
                        key={key}
                        {...input}
                        options={[...input.options!, ...subDepartmentOptions]}
                        onChange={async (e) => {
                          methods.setValue("departmentSubID", e.target.value);
                          if (e.target.value === "63b688c5516a30a651e98156") {
                            await fetchCourses();
                            setShowCoursesField(true);
                          } else {
                            setShowCoursesField(false);
                          }
                        }}
                      />
                    ) : (
                      <Input key={key} {...input} />
                    );
                  })}
                </div>
              ))}
            </div>
            <Input
              element="textarea"
              rows={8}
              placeholder="تیکت خود را وارد کنید"
              label="محتوای تیکت را وارد کنید :"
              name="body"
              className="mt-4"
            />

            <Button
              disabled={isPending}
              className="relative  mt-6 bg-admin-blue-color pr-12"
            >
              {isPending ? (
                <SimpleLoading className="absolute right-4 h-6 w-6" />
              ) : (
                <BsSendFill size={18} className="absolute right-4" />
              )}
              <div>{isPending ? "در حال ارسال تیکت " : "ارسال تیکت"}</div>
            </Button>
          </form>
        </FormProvider>
      </Section>
    </>
  );
}

export { SendTicket };
