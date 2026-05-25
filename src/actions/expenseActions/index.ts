"use server";

import { createExpense, listGroupExpenses } from "@/services/expenses/expenses.service";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";

export const fetchGroupExpensesAction = async (
  groupId: string,
  filters?: { userId?: string; from?: string; to?: string },
) => {
  try {
    const expenses = await listGroupExpenses(groupId, filters);
    return { success: true as const, data: expenses };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error ? error.message : "Failed to load expenses",
    };
  }
};

export const createExpenseAction = async (
  groupId: string,
  payload: {
    title: string;
    amount: number;
    paidById: string;
    date?: string;
    participantIds?: string[];
  },
) => {
  try {
    const expense = await createExpense(groupId, payload);
    revalidatePath(ROUTES.groupDetail(groupId));
    revalidatePath(ROUTES.expenses);
    revalidatePath(ROUTES.dashboard);
    revalidatePath(ROUTES.balances);
    return { success: true as const, data: expense };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false as const,
      message:
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Failed to create expense"),
    };
  }
};
