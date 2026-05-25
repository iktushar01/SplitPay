export type SplitPayUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type GroupMember = {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: string;
  user: SplitPayUser;
};

export type GroupSummary = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  _count?: { expenses: number };
};

export type ExpenseSplit = {
  id: string;
  userId: string;
  owedAmount: string | number;
  user: SplitPayUser;
};

export type Expense = {
  id: string;
  groupId: string;
  title: string;
  amount: string | number;
  paidById: string;
  date: string;
  paidBy: SplitPayUser;
  splits: ExpenseSplit[];
};

export type BalanceEntry = {
  userId: string;
  netBalance?: number;
  effectiveNet?: number;
  paidTotal?: number;
  shareTotal?: number;
  expenseNet?: number;
  settlementAdjustment?: number;
  user: SplitPayUser | null;
};

export type SuggestedTransfer = {
  fromUserId: string;
  toUserId: string;
  amount: number;
  fromUser: SplitPayUser | null;
  toUser: SplitPayUser | null;
};

export type Settlement = {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: string | number;
  status: "PENDING" | "COMPLETED";
  date: string;
  fromUser: SplitPayUser;
  toUser: SplitPayUser;
};

export type GroupDashboard = {
  group: GroupSummary;
  expenses: Expense[];
  balances: BalanceEntry[];
  suggestedTransfers: SuggestedTransfer[];
};
