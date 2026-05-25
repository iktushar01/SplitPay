"use server";

import { changePassword } from "@/services/auth/auth.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

export const changePasswordAction = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ApiResponse<null> | ApiErrorResponse> => {
  try {
    const result = await changePassword(payload);
    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to change password",
    };
  }
};
