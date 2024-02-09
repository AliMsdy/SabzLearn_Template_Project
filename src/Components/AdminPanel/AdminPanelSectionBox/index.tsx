import { cn } from "@/lib/utils";
//types
import { Children } from "@/types/shared";

type SectionProps = Children & {
  className?: string;
};
function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "mt-5 rounded-md bg-white p-4 shadow-admin-panel-box-shadow dark:bg-admin-primary-dark-color",
        className,
      )}
    >
      {children}
    </section>
  );
}

export { Section };
