import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { useState, type DragEvent, type InputHTMLAttributes } from "react";
import type { FieldErrors } from "react-hook-form";

//types
import { AddNewCourseInputTypes, SetState } from "@/types/shared";

type FileUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
  preview: string | ArrayBuffer | null;
  setPreview: SetState<string | ArrayBuffer | null>;
  methods: any;
  errors: FieldErrors<AddNewCourseInputTypes>;
  fieldValue: string;
  title: string;
};

function FileUploader({
  methods,
  errors,
  preview,
  setPreview,
  fieldValue,
  title,
  ...rest
}: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  let previewElement = null;

  const convertFileToImage = (acceptedFiles: FileList) => {
    // Do something with the files
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  };

  // handle drag events
  const handleDrag = function (
    e: DragEvent<HTMLDivElement | HTMLLabelElement>,
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };
  // triggers when file is dropped
  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      methods.setValue(fieldValue, e.dataTransfer.files[0]);
      methods.trigger(fieldValue);
      convertFileToImage(e.dataTransfer.files);
    }
  };
  if (
    preview &&
    Object.keys(errors[fieldValue as keyof typeof errors] || {}).length === 0
  ) {
    if (fieldValue === "cover") {
      previewElement = (
        <>
          <div className="pr-8 font-iranSanse text-lg">پیش نمایش تصویر</div>
          <div className="my-5 flex justify-center">
            <img
              src={preview as string}
              className="max-h-[350px] rounded-md"
              alt="Upload preview"
            />
          </div>
        </>
      );
    } else if (fieldValue === "video") {
      previewElement = (
        <>
          <div className="pr-8 font-iranSanse text-lg">پیش نمایش ویدیو</div>
          <div className="my-5 flex justify-center">
            <video controls>
              <source src={preview as string} />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <div className="text-lg">{title}</div>
      <label
        htmlFor={fieldValue}
        className={cn(
          "relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-4 border-dashed bg-[#f8fafc] p-4 dark:bg-slate",
          { "bg-white": isDragActive },
        )}
        onDragEnter={handleDrag}
      >
        <input
          {...rest}
          {...methods.register(fieldValue)}
          onChange={(e) => {
            if (e.target.files?.length !== 0) {
              methods.register(fieldValue).onChange(e);
              convertFileToImage(e.target.files!);
              methods.trigger(fieldValue);
            }
          }}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and Drop some files here, or click to select files</p>
        )}
        {isDragActive && (
          <div
            className="absolute bottom-0 left-0 right-0 top-0 z-20 h-full w-full rounded-lg"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </label>
      {previewElement}
      <ErrorMessage
        errors={errors}
        name={fieldValue}
        render={({ message }) => (
          <div className="pr-4 text-red-700 ">{message}</div>
        )}
      />
    </>
  );
}

export { FileUploader };
