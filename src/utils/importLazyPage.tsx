import { lazy } from "react";

const importLazyPage = (
  path: string,
  moduleName = path,
  ForAdminOrUser?:string,
) => {
  if (ForAdminOrUser === "admin") {
    return lazy(() =>
      import(`../pages/AdminPanel/${path}/index.tsx`).then((module) => ({
        default: module[moduleName],
      })),
    ) as unknown as () => JSX.Element;
  }else if(ForAdminOrUser === "user"){
    return lazy(() =>
      import(`../pages/UserPanel/${path}/index.tsx`).then((module) => ({
        default: module[moduleName],
      })),
    ) as unknown as () => JSX.Element;
  }
  return lazy(() =>
    import(`../pages/${path}/index.tsx`).then((module) => ({
      default: module[moduleName],
    })),
  ) as unknown as () => JSX.Element;
};

export default importLazyPage;
