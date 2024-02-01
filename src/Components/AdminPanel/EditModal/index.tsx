import { FormProvider, useForm } from "react-hook-form";
//components
import { Button, Input } from "@/Components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadCnComponents/Dialog";

//types
type EditModalProps = {
  DialogTriggerElement: React.ReactNode;
  clickHandler: (data: any) => void;
  title: string;
  description?: string;
  inputList: any[];
};

function EditModal({
  DialogTriggerElement,
  clickHandler,
  title,
  description,
  inputList,
}: EditModalProps) {
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
    <Dialog>
      <DialogTrigger asChild>{DialogTriggerElement}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}

export { EditModal };
