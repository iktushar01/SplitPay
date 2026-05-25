import { fetchMyGroupsAction } from "@/actions/groupActions";
import { listGroupExpenses } from "@/services/expenses/expenses.service";
import { ROUTES } from "@/config/routes";
import { formatDate, formatMoney } from "@/lib/format";
import Link from "next/link";

export default async function ExpensesPage() {
  const groupsResult = await fetchMyGroupsAction();
  const groups = groupsResult.success ? groupsResult.data : [];

  const expenseRows = await Promise.all(
    groups.map(async (group) => {
      const expenses = await listGroupExpenses(group.id);
      return expenses.map((expense) => ({ ...expense, groupName: group.name }));
    }),
  );

  const allExpenses = expenseRows
    .flat()
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          All expenses across your groups.
        </p>
      </div>

      {allExpenses.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No expenses yet.{" "}
          <Link href={ROUTES.groups} className="text-primary hover:underline">
            Add one in a group
          </Link>
          .
        </p>
      ) : (
        <div className="space-y-3">
          {allExpenses.map((expense) => (
            <Link
              key={expense.id}
              href={ROUTES.groupDetail(expense.groupId)}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:border-primary/40"
            >
              <div>
                <p className="font-medium">{expense.title}</p>
                <p className="text-xs text-muted-foreground">
                  {expense.groupName} · Paid by {expense.paidBy.name} ·{" "}
                  {formatDate(expense.date)}
                </p>
              </div>
              <p className="font-semibold">{formatMoney(expense.amount)}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
