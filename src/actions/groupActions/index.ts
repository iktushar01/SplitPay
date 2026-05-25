"use server";

import {
  addGroupMember,
  createGroup,
  getGroupById,
  getGroupDashboard,
  getMyGroups,
  lookupUserByEmail,
} from "@/services/groups/groups.service";
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

export const addMemberByEmailAction = async (
  groupId: string,
  email: string,
) => {
  try {
    const user = await lookupUserByEmail(email);
    if (!user?.id) {
      return { success: false as const, message: "User not found" };
    }
    await addGroupMember(groupId, user.id);
    revalidatePath(ROUTES.groupDetail(groupId));
    revalidatePath(ROUTES.groups);
    return { success: true as const, data: user };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return {
      success: false as const,
      message:
        axiosError.response?.data?.message ||
        (error instanceof Error ? error.message : "Failed to add member"),
    };
  }
};
