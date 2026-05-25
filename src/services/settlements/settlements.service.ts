"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { Settlement } from "@/types/splitpay.types";

export async function listGroupSettlements(groupId: string) {
  const res = await httpClient.get<Settlement[]>(
    `/groups/${groupId}/settlements`,
  );
  return res.data ?? [];
}

export async function createSettlement(
  groupId: string,
  payload: {
    fromUserId: string;
    toUserId: string;
    amount: number;
    date?: string;
  },
) {
  const res = await httpClient.post<Settlement>(
    `/groups/${groupId}/settlements`,
    payload,
  );
  return res.data;
}

export async function completeSettlement(settlementId: string) {
  const res = await httpClient.patch<Settlement>(
    `/settlements/${settlementId}/complete`,
    {},
  );
  return res.data;
}
