"use client";

import { inviteMemberByEmailAction } from "@/actions/groupActions";
import { createExpenseAction } from "@/actions/expenseActions";
import {
  completeSettlementAction,
  createSettlementAction,
} from "@/actions/settlementActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatMoney, getNetBalance } from "@/lib/format";
import { GroupDashboard, Settlement } from "@/types/splitpay.types";
import { ArrowRight, Plus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type GroupDetailClientProps = {
  dashboard: GroupDashboard;
  settlements: Settlement[];
  currentUserId: string;
};

export function GroupDetailClient({
  dashboard,
  settlements,
  currentUserId,
}: GroupDetailClientProps) {
  const router = useRouter();
  const { group, expenses, balances, suggestedTransfers } = dashboard;
  const members = group.members.map((m) => m.user);

  const [expenseOpen, setExpenseOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [settlementOpen, setSettlementOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    title: "",
    amount: "",
    paidById: currentUserId,
  });
  const [memberEmail, setMemberEmail] = useState("");
  const [settlementForm, setSettlementForm] = useState({
    fromUserId: "",
    toUserId: "",
    amount: "",
  });

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(expenseForm.amount);
    if (!expenseForm.title.trim()) {
      toast.error("Please enter an expense title");
      return;
    }
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!expenseForm.paidById) {
      toast.error("Please select who paid");
      return;
    }

    setLoading(true);
    const result = await createExpenseAction(group.id, {
      title: expenseForm.title.trim(),
      amount,
      paidById: expenseForm.paidById,
    });
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Expense added");
    setExpenseOpen(false);
    setExpenseForm({ title: "", amount: "", paidById: currentUserId });
    router.refresh();
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await inviteMemberByEmailAction(group.id, memberEmail.trim());
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setMemberOpen(false);
    setMemberEmail("");
    router.refresh();
  };

  const handleCreateSettlement = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await createSettlementAction(group.id, {
      fromUserId: settlementForm.fromUserId,
      toUserId: settlementForm.toUserId,
      amount: Number(settlementForm.amount),
    });
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Settlement recorded");
    setSettlementOpen(false);
    setSettlementForm({ fromUserId: "", toUserId: "", amount: "" });
    router.refresh();
  };

  const handleCompleteSettlement = async (settlementId: string) => {
    setLoading(true);
    const result = await completeSettlementAction(settlementId, group.id);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Marked as paid");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          {group.description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {group.description}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={memberOpen} onOpenChange={setMemberOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite by email</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If they already use SplitPay, they will see an invite on their
                  dashboard. Otherwise we email them to sign up and join.
                </p>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="friend@email.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Send invitation
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={expenseOpen} onOpenChange={setExpenseOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={expenseForm.title}
                    onChange={(e) =>
                      setExpenseForm((f) => ({ ...f, title: e.target.value }))
                    }
                    placeholder="Dinner, Cab, Rent..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={expenseForm.amount}
                    onChange={(e) =>
                      setExpenseForm((f) => ({ ...f, amount: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Paid by</Label>
                  <Select
                    value={expenseForm.paidById}
                    onValueChange={(v) =>
                      setExpenseForm((f) => ({ ...f, paidById: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  Split equally among all {members.length} members.
                </p>
                <Button type="submit" className="w-full" disabled={loading}>
                  Save expense
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Balances</h3>
              <ul className="mt-3 space-y-2">
                {balances.map((b) => {
                  const net = getNetBalance(b);
                  return (
                  <li
                    key={b.userId}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>{b.user?.name ?? "Unknown"}</span>
                    <span
                      className={
                        net >= 0
                          ? "font-medium text-emerald-600"
                          : "font-medium text-rose-600"
                      }
                    >
                      {net >= 0 ? "+" : ""}
                      {formatMoney(net)}
                    </span>
                  </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">Who pays whom</h3>
              {suggestedTransfers.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Everyone is settled up.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {suggestedTransfers.map((t, i) => (
                    <li
                      key={`${t.fromUserId}-${t.toUserId}-${i}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="font-medium">
                        {t.fromUser?.name ?? "?"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">
                        {t.toUser?.name ?? "?"}
                      </span>
                      <span className="ml-auto font-semibold text-primary">
                        {formatMoney(t.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="pt-4">
          {expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground">No expenses yet.</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Paid by {expense.paidBy.name} · {formatDate(expense.date)}
                    </p>
                  </div>
                  <p className="font-semibold">{formatMoney(expense.amount)}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="members" className="pt-4">
          <ul className="divide-y rounded-xl border bg-card">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-muted-foreground">{member.email}</p>
                </div>
                {member.id === currentUserId ? (
                  <span className="text-xs text-primary">You</span>
                ) : null}
              </li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="settlements" className="space-y-4 pt-4">
          <Dialog open={settlementOpen} onOpenChange={setSettlementOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Record payment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Record settlement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateSettlement} className="space-y-4">
                <div className="space-y-2">
                  <Label>From (payer)</Label>
                  <Select
                    value={settlementForm.fromUserId}
                    onValueChange={(v) =>
                      setSettlementForm((f) => ({ ...f, fromUserId: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To (receiver)</Label>
                  <Select
                    value={settlementForm.toUserId}
                    onValueChange={(v) =>
                      setSettlementForm((f) => ({ ...f, toUserId: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={settlementForm.amount}
                    onChange={(e) =>
                      setSettlementForm((f) => ({
                        ...f,
                        amount: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Save settlement
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {settlements.length === 0 ? (
            <p className="text-sm text-muted-foreground">No settlements yet.</p>
          ) : (
            <div className="space-y-3">
              {settlements.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3"
                >
                  <div className="text-sm">
                    <p className="font-medium">
                      {s.fromUser.name} → {s.toUser.name}
                    </p>
                    <p className="text-muted-foreground">
                      {formatDate(s.date)} · {s.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      {formatMoney(s.amount)}
                    </span>
                    {s.status === "PENDING" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={loading}
                        onClick={() => handleCompleteSettlement(s.id)}
                      >
                        Mark paid
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}