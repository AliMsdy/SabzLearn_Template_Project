import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

//type
import { Children } from "@/types/shared";

type ButtonType = Children &
  ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "filled" | "unfilled";
    component?: string;
    to?: string;
  };

const baseStyles =
  "rounded-md p-2 flex items-center justify-center px-4 disabled:cursor-not-allowed disabled:opacity-50";

function Button({
  children,
  variant = "filled",
  component,
  to,
  className,
  ...props
}: ButtonType) {
  const variantBaseStyles =
    variant === "filled"
      ? " text-white bg-primary-color"
      : " border-2 border-solid border-primary-color text-primary-color  transition-all duration-300 hover:bg-primary-color hover:text-white";

  const mergedClasses = twMerge(baseStyles, variantBaseStyles, className);

  if (component === "link") {
    return (
      <Link to={to!} className={mergedClasses} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button {...props} className={mergedClasses}>
      {children}
    </button>
  );
}

export { Button };
