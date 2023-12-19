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

function flattenArray(arr: (Route | Route[] | undefined)[]): Route[] {
  let flattened: Route[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattened = flattened.concat(flattenArray(arr[i] as Route[]));
    } else if (arr[i]) {
      flattened.push(arr[i] as Route);
    }
  }

  return flattened;
}

const generateFlattenRoutes = (routes: Route[] | undefined): Route[] => {
  if (!routes) return [];
  return flattenArray(
    routes.map(({ routes: subRoutes, ...rest }) => [
      ...[rest],
      ...generateFlattenRoutes(subRoutes),
    ]),
  );
};

export const renderRoutes = (mainRoutes: Routes) => {
  const Routes = ({ isAuthorized }: { isAuthorized: boolean }) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <ReactRoute key={index} element={<Layout />}>
          {subRoutes.map(({ component: Component, path, name,isPublic }) => {
            return (
              <ReactRoute
              key={name}
                element={
                  <ProtectedRoute isPublic={isPublic} isAuthorized={isAuthorized} />
                }
              >
                {Component && path && (
                  <ReactRoute key={name} element={<Component />} path={path} />
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
