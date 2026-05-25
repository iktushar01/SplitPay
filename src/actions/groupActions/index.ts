"use server";

import {
  createGroup,
  getGroupById,
  getGroupDashboard,
  getMyGroups,
} from "@/services/groups/groups.service";
import { inviteToGroup } from "@/services/invites/invites.service";
import { getApiErrorMessage } from "@/lib/apiError";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/config/routes";

export const fetchMyGroupsAction = async () => {
  try {
    const groups = await getMyGroups();
    return { success: true as const, data: groups };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "Failed to load groups",
    };
  }
};

export const fetchGroupDashboardAction = async (groupId: string) => {
  try {
    const data = await getGroupDashboard(groupId);
    return { success: true as const, data };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error ? error.message : "Failed to load group dashboard",
    };
  }
};

export const fetchGroupByIdAction = async (groupId: string) => {
  try {
    const data = await getGroupById(groupId);
    return { success: true as const, data };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "Failed to load group",
    };
  }
};

export const createGroupAction = async (payload: {
  name: string;
  description?: string;
}) => {
  try {
    const group = await createGroup(payload);
    revalidatePath(ROUTES.groups);
    revalidatePath(ROUTES.dashboard);
    return { success: true as const, data: group };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false as const,
      message:
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Failed to create group"),
    };
  }
};

export const inviteMemberByEmailAction = async (
  groupId: string,
  email: string,
) => {
  try {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return { success: false as const, message: "Please enter a valid email" };
    }

    const result = await inviteToGroup(groupId, trimmed);
    revalidatePath(ROUTES.groupDetail(groupId));
    revalidatePath(ROUTES.groups);
    revalidatePath(ROUTES.dashboard);

    return {
      success: true as const,
      data: result.data,
      message:
        result.message ||
        (result.data?.isNewUser
          ? "Invitation email sent. They can sign up on SplitPay to join this group."
          : "Invitation sent. They can accept it from their dashboard."),
    };
  } catch (error: unknown) {
    return {
      success: false as const,
      message: getApiErrorMessage(error, "Failed to send invitation"),
    };
  }
};
