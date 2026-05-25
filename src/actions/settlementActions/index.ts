"use server";

import {
  completeSettlement,
  createSettlement,
  listGroupSettlements,
} from "@/services/settlements/settlements.service";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";

export const fetchGroupSettlementsAction = async (groupId: string) => {
  try {
    const settlements = await listGroupSettlements(groupId);
    return { success: true as const, data: settlements };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error ? error.message : "Failed to load settlements",
    };
  }
};

export const createSettlementAction = async (
  groupId: string,
  payload: {
    fromUserId: string;
    toUserId: string;
    amount: number;
    date?: string;
  },
) => {
  try {
    const settlement = await createSettlement(groupId, payload);
    revalidatePath(ROUTES.groupDetail(groupId));
    revalidatePath(ROUTES.settlements);
    revalidatePath(ROUTES.balances);
    return { success: true as const, data: settlement };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false as const,
      message:
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Failed to create settlement"),
    };
  }
};

export const completeSettlementAction = async (
  settlementId: string,
  groupId: string,
) => {
  try {
    const settlement = await completeSettlement(settlementId);
    revalidatePath(ROUTES.groupDetail(groupId));
    revalidatePath(ROUTES.settlements);
    revalidatePath(ROUTES.balances);
    return { success: true as const, data: settlement };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false as const,
      message:
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Failed to complete settlement"),
    };
  }
};
