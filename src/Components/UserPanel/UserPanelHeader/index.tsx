import { Button } from "@/Components"

//type
import type { ReactNode } from "react";
type UserPanelHeaderProps = {
  title:ReactNode;
  buttonContent:string;
  buttonLink:string;

}

function UserPanelHeader(props:UserPanelHeaderProps) {
  const {title,
    buttonContent,
    buttonLink} = props
  return (
    <div className="mb-8 border-b border-solid border-primary-color pb-3">
    {title}
    <div className="flex justify-end pl-4">
      <Button component="link" to={buttonLink}>
        {buttonContent}
      </Button>
    </div>
  </div>
  )
}

export { UserPanelHeader }