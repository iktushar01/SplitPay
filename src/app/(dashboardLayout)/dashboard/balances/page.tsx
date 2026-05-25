import { fetchMyGroupsAction } from "@/actions/groupActions";
import { getGroupDashboard } from "@/services/groups/groups.service";
import { ROUTES } from "@/config/routes";
import { formatMoney, getNetBalance } from "@/lib/format";
import Link from "next/link";

export default async function BalancesPage() {
  const groupsResult = await fetchMyGroupsAction();
  const groups = groupsResult.success ? groupsResult.data : [];

  const dashboards = await Promise.all(
    groups.map(async (group) => {
      try {
        const dashboard = await getGroupDashboard(group.id);
        return { group, dashboard };
      } catch {
        return null;
      }
    }),
  );

  const valid = dashboards.filter(
    (entry): entry is { group: (typeof groups)[0]; dashboard: NonNullable<Awaited<ReturnType<typeof getGroupDashboard>>> } =>
      entry !== null && entry.dashboard != null,
  );

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Balances</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Who owes and who is owed in each group.
        </p>
      </div>

      {valid.length === 0 ? (
        <p className="text-sm text-muted-foreground">No balance data yet.</p>
      ) : (
        <div className="space-y-6">
          {valid.map(({ group, dashboard }) => (
            <div key={group.id} className="rounded-xl border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">{group.name}</h2>
                <Link
                  href={ROUTES.groupDetail(group.id)}
                  className="text-sm text-primary hover:underline"
                >
                  Open group
                </Link>
              </div>
              <ul className="space-y-2">
                {dashboard.balances.map((b) => {
                  const net = getNetBalance(b);
                  return (
                  <li
                    key={b.userId}
                    className="flex justify-between text-sm"
                  >
                    <span>{b.user?.name ?? "Member"}</span>
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
              {dashboard.suggestedTransfers.length > 0 ? (
                <div className="mt-4 border-t pt-4">
                  <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                    Suggested settlements
                  </p>
                  <ul className="space-y-1 text-sm">
                    {dashboard.suggestedTransfers.map((t, i) => (
                      <li key={i}>
                        {t.fromUser?.name} pays {t.toUser?.name}{" "}
                        <span className="font-semibold">
                          {formatMoney(t.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
