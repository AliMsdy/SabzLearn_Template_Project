import { Loading } from "@/Components";
import { Suspense } from "react";
import { Route as ReactRoute, Routes as ReactRoutes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

type Route = {
  name: string;
  title: string;
  component?: () => JSX.Element;
  path?: string;
  isPublic?: boolean;
  hasSiderLink?: boolean;
  routes?: Route[];
};
type Routes = {
  layout: () => JSX.Element;
  routes: Route[];
}[];

const generateFlattenRoutes = (
  routes: Route[] | undefined,
  basePath = "",
  isPublicParent = true,
): Route[] => {
  if (!routes) return [];

  return routes.flatMap(
    ({ routes: subRoutes, path: routePath, isPublic = true, ...rest }) => {
      const path = `${basePath}/${routePath || ""}`.replace(/\/+/g, "/"); // Combine the basePath and routePath, and replace any consecutive slashes with a single slash
      const isPublicChild = isPublicParent && isPublic; // Set isPublicChild to true only if isPublicParent is true and isPublic is not explicitly set to false

      const flattenedSubRoutes = generateFlattenRoutes(
        subRoutes,
        path,
        isPublicChild,
      );

      return [
        { ...rest, path, isPublic: isPublicChild },
        ...flattenedSubRoutes,
      ];
    },
  );
};

export const renderRoutes = (mainRoutes: Routes) => {
  const Routes = ({ isAuthorized }: { isAuthorized: boolean }) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);
      return (
        <ReactRoute key={index} element={<Layout />}>
          {subRoutes.map(({ component: Component, path, name, isPublic }) => {
            // const isAdminPanelPage = path?.includes("/admin-panel");
            // const isUserPanelPage = path?.includes("/my-account");
            return (
              <ReactRoute
                key={name}
                element={
                  <ProtectedRoute
                    // isPublic={isAdminPanelPage || isUserPanelPage ? false : isPublic}
                    isPublic={isPublic}
                    isAuthorized={isAuthorized}
                    path={path as string}
                  />
                }
              >
                {Component && path && (
                  <ReactRoute
                    key={name}
                    element={
                      <Suspense fallback={<Loading />}>
                        <Component />
                      </Suspense>
                    }
                    path={path}
                  />
                )}
              </ReactRoute>
            );
          })}
        </ReactRoute>
      );
    });
    return <ReactRoutes>{layouts}</ReactRoutes>;
  };
  return Routes;
};
