"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  GroupDashboard,
  GroupSummary,
  SplitPayUser,
} from "@/types/splitpay.types";

export async function getMyGroups() {
  const res = await httpClient.get<GroupSummary[]>("/groups");
  return res.data ?? [];
}

export async function getGroupById(groupId: string) {
  const res = await httpClient.get<GroupSummary>(`/groups/${groupId}`);
  return res.data;
}

export async function getGroupDashboard(groupId: string) {
  const res = await httpClient.get<GroupDashboard>(
    `/groups/${groupId}/dashboard`,
  );
  return res.data;
}

export async function createGroup(payload: {
  name: string;
  description?: string;
}) {
  const res = await httpClient.post<GroupSummary>("/groups", payload);
  return res.data;
}

export async function addGroupMember(groupId: string, userId: string) {
  const res = await httpClient.post(`/groups/${groupId}/members`, { userId });
  return res.data;
}

export async function lookupUserByEmail(email: string) {
  const res = await httpClient.get<SplitPayUser>("/users/lookup", {
    params: { email },
  });
  return res.data;
}
