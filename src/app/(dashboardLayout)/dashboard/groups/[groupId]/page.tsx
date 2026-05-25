import { fetchGroupDashboardAction } from "@/actions/groupActions";
import { fetchGroupSettlementsAction } from "@/actions/settlementActions";
import { GroupDetailClient } from "@/components/modules/groups/GroupDetailClient";
import { getUserInfo } from "@/services/auth/auth.services";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

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
      <section className="relative space-y-6 w-full py-6 px-4 animate-in fade-in zoom-in-95 duration-500">
        {/* Sci-Fi Decorative Grid Backdrop */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <Link 
          href={ROUTES.groups} 
          className="group inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to groups
        </Link>
        
        <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-5 backdrop-blur-sm flex items-center gap-3">
          <div className="absolute top-0 left-0 h-full w-[3px] bg-destructive" />
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-2 text-destructive">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-destructive/80">Registry Error</p>
            <p className="text-xs font-bold font-mono text-destructive mt-0.5">
              {dashboardResult.message ?? "Group not found"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative space-y-6 w-full py-6 px-4 animate-in fade-in zoom-in-95 duration-500">
      {/* Sci-Fi Decorative Grid Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/3 -z-10 h-[200px] w-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <Link
        href={ROUTES.groups}
        className="group inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to groups
      </Link>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
        <GroupDetailClient
          dashboard={dashboardResult.data}
          settlements={settlementsResult.success ? settlementsResult.data ?? [] : []}
          currentUserId={user.id}
        />
      </div>
    </section>
  );
}