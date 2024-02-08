//components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/AdminPanel/shadCnComponents/AlertDialog";

//types
import { SetState } from "@/types/shared";
type AlertProps = {
  message: string;
  clickHandler: () => void;
  AlertTrigger: React.ReactNode;
  open?: boolean;
  setOpen?:SetState<boolean>;
};

function Alert({ message, clickHandler, AlertTrigger,open,setOpen }: AlertProps) {
  const AlertDialogState = open ? {open:open,setOpen:setOpen} : {}
  return (
    <AlertDialog {...AlertDialogState}>
      <AlertDialogTrigger asChild>{AlertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clickHandler}>بله</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { Alert as AlertDialog };
