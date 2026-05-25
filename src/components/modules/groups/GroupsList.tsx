import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { formatDate } from "@/lib/format";
import { GroupSummary } from "@/types/splitpay.types";
import { Users } from "lucide-react";

type GroupsListProps = {
  groups: GroupSummary[];
};

export function GroupsList({ groups }: GroupsListProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No groups yet. Create one to start splitting expenses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {groups.map((group) => (
        <Link
          key={group.id}
          href={ROUTES.groupDetail(group.id)}
          className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{group.name}</h3>
              {group.description ? (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {group.description}
                </p>
              ) : null}
            </div>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {group._count?.expenses ?? 0} expenses
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {group.members.length} members
            </span>
            <span>Updated {formatDate(group.updatedAt)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
