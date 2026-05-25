import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/authUtils";
import { getTokenExpirationTime } from "@/lib/tokenUtils";
import { ApiResponse } from "@/types/api.types";
import { AuthUser } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

type OAuthExchangeResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  return apiBaseUrl.replace(/\/$/, "");
};

const getSafeRedirectPath = (redirectPath: string | null, role: string) => {
  const normalizedRole = role.toUpperCase() as UserRole;
  const requestedPath =
    redirectPath?.startsWith("/") && !redirectPath.startsWith("//")
      ? redirectPath
      : null;

  if (requestedPath && isValidRedirectForRole(requestedPath, normalizedRole)) {
    return requestedPath;
  }

  return getDefaultDashboardRoute(normalizedRole);
};

const setAuthCookie = (
  response: NextResponse,
  name: string,
  value: string,
  fallbackMaxAge: number,
  httpOnly = true
) => {
  response.cookies.set(name, value, {
    httpOnly,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getTokenExpirationTime(value) ?? fallbackMaxAge,
  });
};

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const redirectPath = searchParams.get("redirect");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_oauth_code", origin));
  }

  try {
    const exchangeResponse = await fetch(
      `${getApiBaseUrl()}/auth/oauth/code?code=${encodeURIComponent(code)}`,
      { cache: "no-store" }
    );
    const result = (await exchangeResponse.json()) as ApiResponse<OAuthExchangeResponse>;

    if (!exchangeResponse.ok || !result.success || !result.data) {
      throw new Error(result.message || "OAuth exchange failed");
    }

    const { accessToken, refreshToken, user } = result.data;
    const targetPath = getSafeRedirectPath(redirectPath, user.role);
    const response = NextResponse.redirect(new URL(targetPath, origin));

    setAuthCookie(response, "accessToken", accessToken, 24 * 60 * 60);
    setAuthCookie(response, "refreshToken", refreshToken, 7 * 24 * 60 * 60);
    response.cookies.set("user", JSON.stringify(user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Google OAuth callback failed:", error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", origin));
  }
}
