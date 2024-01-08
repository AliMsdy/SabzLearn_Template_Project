import { lazy } from "react";

 const importLazyPage = (path: string, moduleName = path) => {
    return lazy(() =>
      import(`../pages/${path}`).then((module) => ({
        default: module[moduleName],
      })),
    ) as unknown as () => JSX.Element;
  };

  export default importLazyPage