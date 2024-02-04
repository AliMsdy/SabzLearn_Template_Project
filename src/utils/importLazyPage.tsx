import { lazy } from "react";

const importLazyPage = (
  path: string,
  moduleName = path,
  isForAdminPanel?: boolean,
) => {
  if (isForAdminPanel) {
    return lazy(() =>
      import(`../pages/AdminPanel/${path}/index.tsx`).then((module) => ({
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
