import { useQueryClient } from "@tanstack/react-query";

import {
  addMenuValidationSchema,
  addNewMenuInputList,
} from "@/constants/formInputsInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
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

//type
import type { InputListType, MenusType } from "@/types/shared";

type AddMenuInputTypes = {
  title: string;
  href: string;
  parent?: string | undefined;
};

function AddNewMenu({ menus }: { menus: MenusType[] }) {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const [completeMenusList, setCompleteMenusList] = useState<InputListType[][]>(
    [],
  );
  const methods = useForm<AddMenuInputTypes>({
    resolver: yupResolver(addMenuValidationSchema),
    defaultValues: {
      title: "",
      href: "",
      parent: "",
    },
  });
  const { mutate: addNewMenu, isPending } = useMutateCall(
    ["addNewMenuToSite"],
    {
      onSuccess: async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await queryClient.invalidateQueries({
          queryKey: ["Menus"],
        });
        toast.success("منوی مورد نظر با موفقیت ساخته شد.");
        methods.reset();
      },
    },
  );
  useEffect(() => {
    //adding the menus fetched from api to the select input list
    const updatedInputList = addNewMenuInputList.map((inputArray, index) => {
      if (index === 0) {
        return inputArray.map((input) => {
          if (input.element === "select") {
            const allMainMenus = menus.filter(
              (menu: MenusType) => !menu.parent,
            );
            const newOptionsList = allMainMenus.map((menu) => ({
              title: menu.title,
              value: menu._id,
            }));

            const newInputItem = {
              ...input,
              options: [...input.options, ...newOptionsList],
            };
            return newInputItem;
          } else {
            return input;
          }
        });
      }
      return inputArray;
    });
    setCompleteMenusList(updatedInputList);
  }, [menus]);

  const onSubmit: SubmitHandler<AddMenuInputTypes> = (data) => {
    addNewMenu({
      url: "/menus",
      data:{...data,parent: data.parent === "" ? undefined : data.parent},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Section>
      <h2 className="mt-2 text-2xl">
        افزودن <span className="text-admin-blue-color">منوی</span> جدید
      </h2>
      <FormProvider {...methods}>
        <form className="p-5" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10  md:flex-row">
            {completeMenusList.map((inputArray, index) => {
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
            <div>
              {isPending ? "در حال ارسال اطلاعات به سرور " : "افزودن منو"}
            </div>
          </Button>
        </form>
      </FormProvider>
    </Section>
  );
}

export { AddNewMenu };
