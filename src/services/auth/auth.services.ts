"use server";

import { cookies } from "next/headers";
import { ApiResponse } from "@/types/api.types";
import { AuthUser } from "@/types/auth.types";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}

type BackendAuthUser = AuthUser & {
  student?: { profilePhoto?: string | null } | null;
};

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables");
  }

  return apiBaseUrl;
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

export async function getUserInfo(): Promise<BackendAuthUser | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;

  if (userCookie) {
    try {
      return JSON.parse(userCookie) as BackendAuthUser;
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

  const result = (await response.json()) as ApiResponse<BackendAuthUser>;
  return result.data ?? null;
}

export async function updateProfile(
  payload: FormData
): Promise<ApiResponse<BackendAuthUser>> {
  const response = await fetch(`${getApiBaseUrl()}/auth/profile`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
    body: payload,
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<BackendAuthUser>;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
}

/**
 * Refreshes the access token using the refresh token
 */
export async function getNewTokensWithRefreshToken(
  refreshToken: string
): Promise<TokenResponse> {
  try {
    await cookies();

    // TODO: Make actual API call to refresh endpoint
    // Example implementation:
    // const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ refreshToken }),
    // });
    //
    // if (!response.ok) {
    //   throw new Error('Failed to refresh token');
    // }
    //
    // const data = await response.json() as ApiResponse<TokenResponse>;
    // if (!data.success || !data.data) {
    //   throw new Error(data.message || 'Failed to refresh token');
    // }
    //
    // const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

    // For now, return the same token (placeholder)
    // In a real implementation, this would fetch new tokens from the backend
    const newTokens: TokenResponse = {
      accessToken: refreshToken, // Placeholder
      refreshToken: refreshToken, // Placeholder
      expiresIn: 3600,
    };

    // Update cookies with new tokens
    // cookieStore.set('accessToken', newTokens.accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   maxAge: newTokens.expiresIn || 3600,
    // });
    //
    // if (newTokens.refreshToken) {
    //   cookieStore.set('refreshToken', newTokens.refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'lax',
    //     maxAge: 7 * 24 * 60 * 60, // 7 days
    //   });
    // }

    return newTokens;
  } catch (error: unknown) {
    console.error("Error refreshing token:", error);
    throw new Error(getErrorMessage(error, "Failed to refresh token"));
  }
}

/**
 * Logs out the user by clearing auth cookies
 */
export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies();

    // Clear auth cookies
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error: unknown) {
    console.error("Error logging out:", error);
    throw new Error(getErrorMessage(error, "Failed to logout"));
  }
}
