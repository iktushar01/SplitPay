import { AUTH_ROUTES, PROTECTED_PREFIXES, ROUTES } from "@/config/routes";

export type UserRole = "USER";

export const authRoutes = [...AUTH_ROUTES];

export const isAuthRoute = (pathname: string) =>
  authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const userProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/],
  exact: [],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | null => {
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }
  return null;
};

export const getDefaultDashboardRoute = (_role: UserRole) => ROUTES.dashboard;

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
  const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
  const routeOwner = getRouteOwner(sanitizedRedirectPath);

  if (routeOwner === null) {
    return true;
  }

  return routeOwner === role;
};

export const isProtectedRoute = (pathname: string) =>
  PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
