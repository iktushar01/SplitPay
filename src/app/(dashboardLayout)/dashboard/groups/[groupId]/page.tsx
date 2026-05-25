import { fetchGroupDashboardAction } from "@/actions/groupActions";
import { fetchGroupSettlementsAction } from "@/actions/settlementActions";
import { GroupDetailClient } from "@/components/modules/groups/GroupDetailClient";
import { getUserInfo } from "@/services/auth/auth.services";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ groupId: string }>;
};

export default async function GroupDetailPage({ params }: PageProps) {
  const { groupId } = await params;
  const user = await getUserInfo();

  if (!user?.id) {
    redirect(ROUTES.login);
  }

  const [dashboardResult, settlementsResult] = await Promise.all([
    fetchGroupDashboardAction(groupId),
    fetchGroupSettlementsAction(groupId),
  ]);

  if (!dashboardResult.success || !dashboardResult.data) {
    return (
      <section className="space-y-4">
        <Link href={ROUTES.groups} className="text-sm text-primary hover:underline">
          ← Back to groups
        </Link>
        <p className="text-destructive">
          {dashboardResult.message ?? "Group not found"}
        </p>
      </section>
    );
  }

  return (
    <section>
      <Link
        href={ROUTES.groups}
        className="mb-4 inline-block text-sm text-primary hover:underline"
      >
        ← Back to groups
      </Link>
      <GroupDetailClient
        dashboard={dashboardResult.data}
        settlements={settlementsResult.success ? settlementsResult.data ?? [] : []}
        currentUserId={user.id}
      />
    </section>
  );
}
