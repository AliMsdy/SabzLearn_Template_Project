//components
// import { Button } from "@/Components";
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadCnComponents/Dialog";

type ModalProps = {
  DialogTriggerElement: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

function Modal({
  DialogTriggerElement,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{DialogTriggerElement}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export { Modal };

