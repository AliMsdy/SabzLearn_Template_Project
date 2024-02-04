import { cn } from "@/lib/utils";
import { ErrorMessage } from "@hookform/error-message";
import { useState, type DragEvent, type InputHTMLAttributes } from "react";
import type { FieldErrors, UseFormReturn } from "react-hook-form";

//types
import { AddNewCourseInputTypes,SetState } from "@/types/shared";

type FileUploaderProps = InputHTMLAttributes<HTMLInputElement> & {
  preview:string | ArrayBuffer | null;
  setPreview:SetState<string | ArrayBuffer | null>;
  methods: UseFormReturn<AddNewCourseInputTypes, any, undefined>;
  errors: FieldErrors<AddNewCourseInputTypes>;
};

function FileUploader({ methods, errors,preview,setPreview, ...rest }: FileUploaderProps) {
  
  const [isDragActive, setIsDragActive] = useState(false);

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
      methods.setValue("cover", e.dataTransfer.files[0]);
      methods.trigger("cover");
      convertFileToImage(e.dataTransfer.files);
    }
  };
  return (
    <>
      <h2 className="text-lg">عکس کاور دوره</h2>
      <label
        htmlFor="cover"
        className={cn(
          "relative flex h-40 w-full cursor-pointer items-center justify-center rounded-lg border-4 border-dashed bg-[#f8fafc] p-4",
          { "bg-white": isDragActive },
        )}
        onDragEnter={handleDrag}
      >
        <input
          {...rest}
          {...methods.register("cover")}
          onChange={(e) => {
            methods.register("cover").onChange(e);
            convertFileToImage(e.target.files!);
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
      {preview && Object.keys(errors.cover || {}).length === 0 && (
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
      )}
      <ErrorMessage
        errors={errors}
        name="cover"
        render={({ message }) => (
          <div className="pr-4 text-red-700">{message}</div>
        )}
      />
    </>
  );
}

export { FileUploader };
