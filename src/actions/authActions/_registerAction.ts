"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { redirect } from "next/navigation";

export const registerAction = async (formData: FormData) => {
  try {
    // Axios will automatically set the correct boundary for multipart/form-data
    const result = await httpClient.post("/auth/register", formData);
    
    if (result?.success) {
      const email = formData.get("email") as string;
      redirect(`/verify-email?email=${encodeURIComponent(email)}`);
    }

    return result;
  } catch (error: unknown) {
    const maybeError = error as {
      digest?: string;
      response?: { data?: { message?: string } };
      message?: string;
    };

    if (maybeError.digest?.startsWith("NEXT_REDIRECT")) throw error;

    return {
      success: false,
      message:
        maybeError.response?.data?.message ||
        maybeError.message ||
        "Registration failed",
    };
  }
};
