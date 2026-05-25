"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { Expense } from "@/types/splitpay.types";

export async function listGroupExpenses(
  groupId: string,
  filters?: { userId?: string; from?: string; to?: string },
) {
  const res = await httpClient.get<Expense[]>(`/groups/${groupId}/expenses`, {
    params: filters,
  });
  return res.data ?? [];
}

export async function createExpense(
  groupId: string,
  payload: {
    title: string;
    amount: number;
    paidById: string;
    date?: string;
    participantIds?: string[];
  },
) {
  const res = await httpClient.post<Expense>(
    `/groups/${groupId}/expenses`,
    payload,
  );
  return res.data;
}
