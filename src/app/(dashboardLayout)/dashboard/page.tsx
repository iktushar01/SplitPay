import { fetchMyGroupsAction } from "@/actions/groupActions";
import { fetchMyInvitesAction } from "@/actions/inviteActions";
import { PendingInvites } from "@/components/modules/dashboard/PendingInvites";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { Users, ReceiptText, CircleDollarSign } from "lucide-react";

export default async function DashboardPage() {
  const [result, invitesResult] = await Promise.all([
    fetchMyGroupsAction(),
    fetchMyInvitesAction(),
  ]);
  const groups = result.success ? result.data : [];
  const invites = invitesResult.success ? invitesResult.data : [];

  const totalExpenses = groups.reduce(
    (sum, g) => sum + (g._count?.expenses ?? 0),
    0,
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track group expenses, balances, and settlements from one place.
        </p>
      </div>

      <PendingInvites invites={invites} />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Active groups", value: String(groups.length), icon: Users },
          {
            label: "Total expenses",
            value: String(totalExpenses),
            icon: ReceiptText,
          },
          {
            label: "Quick action",
            value: "Settle up",
            icon: CircleDollarSign,
            href: ROUTES.settlements,
          },
        ].map(({ label, value, icon: Icon, href }) => (
          <div key={label} className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            {href ? (
              <Link
                href={href}
                className="mt-2 block text-lg font-bold text-primary hover:underline"
              >
                {value}
              </Link>
            ) : (
              <p className="mt-2 text-3xl font-bold">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent groups</h2>
          <Link
            href={ROUTES.groups}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {groups.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Create a group to get started.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.slice(0, 4).map((group) => (
              <Link
                key={group.id}
                href={ROUTES.groupDetail(group.id)}
                className="rounded-lg border bg-card p-4 hover:border-primary/40"
              >
                <p className="font-medium">{group.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {group.members.length} members ·{" "}
                  {group._count?.expenses ?? 0} expenses
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
