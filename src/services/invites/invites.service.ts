"use server";

import { httpClient } from "@/lib/axios/httpClient";

export type GroupInvite = {
  id: string;
  groupId: string;
  email: string;
  status: string;
  createdAt: string;
  group: { id: string; name: string; description?: string | null };
  invitedBy: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
};

export async function inviteToGroup(groupId: string, email: string) {
  const res = await httpClient.post<{
    invite: GroupInvite;
    isNewUser: boolean;
  }>(`/groups/${groupId}/invites`, { email });
  return { data: res.data, message: res.message };
}

export async function getMyInvites() {
  const res = await httpClient.get<GroupInvite[]>("/invites");
  return res.data ?? [];
}

export async function acceptInvite(inviteId: string) {
  const res = await httpClient.post<{ id: string; name: string }>(
    `/invites/${inviteId}/accept`,
    {},
  );
  return res;
}

export async function declineInvite(inviteId: string) {
  return httpClient.post<null>(`/invites/${inviteId}/decline`, {});
}
