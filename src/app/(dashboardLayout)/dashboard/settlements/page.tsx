import { fetchMyGroupsAction } from "@/actions/groupActions";
import { listGroupSettlements } from "@/services/settlements/settlements.service";
import { ROUTES } from "@/config/routes";
import { formatDate, formatMoney } from "@/lib/format";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function SettlementsPage() {
  const groupsResult = await fetchMyGroupsAction();
  const groups = groupsResult.success ? groupsResult.data : [];

  const rows = await Promise.all(
    groups.map(async (group) => {
      const settlements = await listGroupSettlements(group.id);
      return settlements.map((s) => ({ ...s, groupName: group.name }));
    }),
  );

  const allSettlements = rows
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const pending = allSettlements.filter((s) => s.status === "PENDING").length;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settlements</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Payment history and pending settlements ({pending} pending).
        </p>
      </div>

      {allSettlements.length === 0 ? (
        <p className="text-sm text-muted-foreground">No settlements yet.</p>
      ) : (
        <div className="space-y-3">
          {allSettlements.map((s) => (
            <Link
              key={s.id}
              href={ROUTES.groupDetail(s.groupId)}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-card px-4 py-3 hover:border-primary/40"
            >
              <div>
                <p className="font-medium">
                  {s.fromUser.name} → {s.toUser.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {s.groupName} · {formatDate(s.date)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">{formatMoney(s.amount)}</span>
                <Badge variant={s.status === "PENDING" ? "secondary" : "default"}>
                  {s.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
