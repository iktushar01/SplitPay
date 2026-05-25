type ApiErrorBody = {
  message?: string;
  errorSources?: { path?: string; message: string }[];
};

export function getApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  const axiosError = error as {
    response?: { data?: ApiErrorBody };
    message?: string;
  };

  const data = axiosError.response?.data;
  const firstFieldError = data?.errorSources?.[0]?.message;

  if (firstFieldError) {
    return firstFieldError;
  }

  if (data?.message && data.message !== "Validation failed") {
    return data.message;
  }

  if (data?.message === "Validation failed" && data.errorSources?.length) {
    return data.errorSources
      .map((e) => (e.path ? `${e.path}: ${e.message}` : e.message))
      .join(". ");
  }

  return data?.message || axiosError.message || fallback;
}
