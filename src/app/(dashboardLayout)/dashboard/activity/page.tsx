import { fetchMyGroupsAction } from "@/actions/groupActions";
import { listGroupExpenses } from "@/services/expenses/expenses.service";
import { listGroupSettlements } from "@/services/settlements/settlements.service";
import { ROUTES } from "@/config/routes";
import { formatDate, formatMoney } from "@/lib/format";
import Link from "next/link";

type ActivityItem = {
  id: string;
  type: "expense" | "settlement";
  title: string;
  subtitle: string;
  amount?: string;
  date: string;
  groupId: string;
};

export default async function ActivityPage() {
  const groupsResult = await fetchMyGroupsAction();
  const groups = groupsResult.success ? groupsResult.data : [];

  const activities: ActivityItem[] = [];

  for (const group of groups) {
    const [expenses, settlements] = await Promise.all([
      listGroupExpenses(group.id),
      listGroupSettlements(group.id),
    ]);

    expenses.forEach((e) => {
      activities.push({
        id: `expense-${e.id}`,
        type: "expense",
        title: e.title,
        subtitle: `${group.name} · paid by ${e.paidBy.name}`,
        amount: formatMoney(e.amount),
        date: e.date,
        groupId: group.id,
      });
    });

    settlements.forEach((s) => {
      activities.push({
        id: `settlement-${s.id}`,
        type: "settlement",
        title: `${s.fromUser.name} paid ${s.toUser.name}`,
        subtitle: `${group.name} · ${s.status}`,
        amount: formatMoney(s.amount),
        date: s.date,
        groupId: group.id,
      });
    });
  }

  activities.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Recent expenses and settlements across all groups.
        </p>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No activity yet.</p>
      ) : (
        <div className="space-y-3">
          {activities.map((item) => (
            <Link
              key={item.id}
              href={ROUTES.groupDetail(item.groupId)}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 hover:border-primary/40"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.subtitle} · {formatDate(item.date)}
                </p>
              </div>
              {item.amount ? (
                <span className="text-sm font-semibold">{item.amount}</span>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
