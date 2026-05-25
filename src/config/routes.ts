export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  verifyEmail: "/verify-email",
  dashboard: "/dashboard",
  groups: "/dashboard/groups",
  groupDetail: (groupId: string) => `/dashboard/groups/${groupId}`,
  expenses: "/dashboard/expenses",
  balances: "/dashboard/balances",
  settlements: "/dashboard/settlements",
  settings: "/dashboard/settings",
  activity: "/dashboard/activity",
} as const;

export const AUTH_ROUTES = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
  ROUTES.verifyEmail,
] as const;

export const PROTECTED_PREFIXES = [ROUTES.dashboard] as const;
