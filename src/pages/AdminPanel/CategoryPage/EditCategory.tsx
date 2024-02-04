import { FormProvider, useForm } from "react-hook-form";
//components
import { Button, Input } from "@/Components";
import {
  DialogClose,
  DialogFooter,
} from "@/Components/AdminPanel/shadCnComponents/Dialog";

type EditCategoryPropsType = {
  inputList: any[];
  clickHandler: (data: any) => void;
};
function EditCategory({ inputList, clickHandler }: EditCategoryPropsType) {
  const defaultValuesList = inputList.map((item) => ({
    [item.name]: item.value,
  }));
  // combine all the objects(defaultValuesList is array of objects) into one object
  const combinedDefaultValuesList = Object.assign({}, ...defaultValuesList);
  const methods = useForm<any>({
    mode: "onChange",
    defaultValues: combinedDefaultValuesList,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(clickHandler)}>
        {inputList.map((input) => (
          <Input
            showLabelNextToInput
            isValidationStylesEnabled={false}
            key={input.name}
            {...input}
          />
        ))}
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="submit">ذخیره تغییرات</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}

export { EditCategory };
