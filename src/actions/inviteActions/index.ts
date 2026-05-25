"use server";

import {
  acceptInvite,
  declineInvite,
  getMyInvites,
} from "@/services/invites/invites.service";
import { getApiErrorMessage } from "@/lib/apiError";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";

export const fetchMyInvitesAction = async () => {
  try {
    const invites = await getMyInvites();
    return { success: true as const, data: invites };
  } catch (error) {
    return {
      success: false as const,
      message: getApiErrorMessage(error, "Failed to load invitations"),
      data: [] as const,
    };
  }
};

export const acceptInviteAction = async (inviteId: string) => {
  try {
    const result = await acceptInvite(inviteId);
    revalidatePath(ROUTES.dashboard);
    revalidatePath(ROUTES.groups);
    return {
      success: true as const,
      data: result.data,
      message: result.message || "You joined the group",
    };
  } catch (error) {
    return {
      success: false as const,
      message: getApiErrorMessage(error, "Failed to accept invitation"),
    };
  }
};

export const declineInviteAction = async (inviteId: string) => {
  try {
    await declineInvite(inviteId);
    revalidatePath(ROUTES.dashboard);
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      message: getApiErrorMessage(error, "Failed to decline invitation"),
    };
  }
};
