"use server";

import { cookies } from "next/headers";
import { ApiResponse } from "@/types/api.types";
import { AuthUser } from "@/types/auth.types";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  return apiBaseUrl.replace(/\/$/, "");
};

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    Cookie: cookieHeader,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
};

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export async function getUserInfo(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  if (userCookie) {
    try {
      return JSON.parse(userCookie) as AuthUser;
    } catch {
      cookieStore.delete("user");
    }
  }

  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load user info");
  }

  const result = (await response.json()) as ApiResponse<AuthUser>;
  return result.data ?? null;
}

export async function updateProfile(
  payload: FormData,
): Promise<ApiResponse<AuthUser>> {
  const response = await fetch(`${getApiBaseUrl()}/auth/me`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: payload,
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<AuthUser>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<TokenResponse> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const response = await fetch(`${getApiBaseUrl()}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: [
        `refreshToken=${refreshToken}`,
        sessionToken ? `better-auth.session_token=${sessionToken}` : "",
      ]
        .filter(Boolean)
        .join("; "),
    },
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<TokenResponse>;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "Failed to refresh token");
  }

  const { setTokenInCookies } = await import("@/lib/tokenUtils");
  await setTokenInCookies("accessToken", result.data.accessToken);
  await setTokenInCookies("refreshToken", result.data.refreshToken);

  return result.data;
}

export async function logout(): Promise<void> {
  const headers = await getAuthHeaders();

  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      headers,
      cache: "no-store",
    });
  } catch (error) {
    console.error("Backend logout failed:", error);
  }

  const cookieStore = await cookies();
  [
    "accessToken",
    "refreshToken",
    "better-auth.session_token",
    "better-auth.session_data",
    "user",
  ].forEach((name) => cookieStore.delete(name));
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ApiResponse<null>> {
  const response = await fetch(`${getApiBaseUrl()}/auth/change-password`, {
    method: "POST",
    headers: {
      ...(await getAuthHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<null>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to change password");
  }

  return result;
}
