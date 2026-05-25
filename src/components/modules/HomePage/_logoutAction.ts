"use server";

import { cookies } from "next/headers";
import { logout } from "@/services/auth/auth.services";

export const logoutAction = async () => {
  try {
    await logout();

    const cookieStore = await cookies();
    [
      "user",
      "accessToken",
      "refreshToken",
      "better-auth.session_token",
      "better-auth.session_data",
    ].forEach((name) => cookieStore.delete(name));

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to logout",
    };
  }
};
