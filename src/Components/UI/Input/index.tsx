import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement> & {
    Icon?: IconType;
    element?: string;
    options?: { title: string; value: string; disabled?: boolean }[];
    isValidationStylesEnabled?: boolean;
    label?: string;
    showLabelNextToInput?: boolean;
  };

function Input({
  Icon,
  element,
  options,
  isValidationStylesEnabled = true,
  showLabelNextToInput,
  label,
  ...rest
}: InputProps) {
  let style;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const ErrorMessageElement = (
    <ErrorMessage
      errors={errors}
      name={rest.name!}
      render={({ message }) => (
        <div className="py-1 pr-4 text-red-700">{message}</div>
      )}
    />
  );
  const {
    field,
    fieldState: { invalid, isDirty },
  } = useController({
    control,
    name: rest.name!,
  });

  if (element === "select") {
    return (
      <>
        <select
          {...field}
          {...rest}
          className={cn(
            "mt-4 block w-full rounded-md p-2 px-4 dark:bg-[#484965] dark:shadow-dark-theme",
            rest.className,
          )}
        >
          {options?.map(({ title, ...rest }) => (
            <option key={title} {...rest}>
              {title}
            </option>
          ))}
        </select>
        {ErrorMessageElement}
      </>
    );
  }

  if (element !== "select" && isValidationStylesEnabled === true) {
    const hasError = isDirty ? (invalid ? true : false) : null;

    style =
      hasError === true
        ? "border-red-500"
        : hasError === false
          ? "border-primary-color"
          : "";
  }

  if (element === "textarea") {
    return (
      <>
        <textarea
          {...rest}
          {...field}
          className={cn(
            "my-4 w-full rounded-md p-4 text-black shadow-custom focus:outline-none dark:bg-[#484965] dark:text-white dark:shadow-dark-theme",
            style,
            rest.className,
          )}
        />
        {ErrorMessageElement}
      </>
    );
  }

  return (
    <div
      className={`flex ${
        showLabelNextToInput ? "my-2 items-center gap-4 " : "flex-col"
      }  `}
    >
      {label && (
        <label
          className={cn(`mb-2 pr-2`, { "w-14": showLabelNextToInput })}
          htmlFor={rest.id}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex items-center justify-between  rounded-md border-2 border-solid border-[#e6e6e6] p-1  shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] dark:border-none dark:bg-slate ",
          { "flex-grow": showLabelNextToInput },
          style,
          rest.className,
        )}
      >
        <input
          {...rest}
          {...field}
          className="w-full p-2 text-right focus:outline-none dark:bg-transparent"
          spellCheck="false"
        />
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 text-[#ccc] dark:text-white"
          />
        )}
      </div>
      {ErrorMessageElement}
    </div>
  );
}

export { Input };
