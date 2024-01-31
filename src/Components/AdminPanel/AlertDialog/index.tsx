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
type AlertProps = {
  message: string;
  clickHandler: () => void;
  AlertTrigger: React.ReactNode;
};

function Alert({ message, clickHandler, AlertTrigger }: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{AlertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">{message}</AlertDialogTitle>
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
