import { fetchMyGroupsAction } from "@/actions/groupActions";
import { fetchMyInvitesAction } from "@/actions/inviteActions";
import { PendingInvites } from "@/components/modules/dashboard/PendingInvites";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { Users, ReceiptText, CircleDollarSign, Plus, ArrowUpRight, Activity } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"; // Assuming standard shadcn setup

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

  // Gamified metrics derived mathematically from original content values
  const currentTierProgress = Math.min(100, Math.floor((totalExpenses % 10) * 10));

  return (
    <section className="relative space-y-8 w-full py-6 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Sci-Fi Decorative Grid Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/3 -z-10 h-[200px] w-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Modern Header Terminal */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-border/60 bg-background/50 backdrop-blur-md p-6 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute top-0 left-0 h-[2px] w-20 bg-gradient-to-r from-primary to-transparent" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              Dashboard
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary uppercase animate-pulse">
              <Activity className="h-2.5 w-2.5" /> Live
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide">
            Track group expenses, balances, and settlements from one place.
          </p>
        </div>
        
        <Link 
          href={ROUTES.groups}
          className={`${buttonVariants({ variant: "default", size: "sm" })} relative group overflow-hidden font-bold tracking-wider uppercase text-[11px] rounded-xl shadow-[0_4px_20px_rgba(var(--primary),0.25)] transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0`}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          <Plus className="mr-1.5 h-3.5 w-3.5" /> Create Group
        </Link>
      </div>

      <PendingInvites invites={invites} />

      {/* Gamified Bento Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { 
            label: "Active groups", 
            value: String(groups.length), 
            icon: Users,
            color: "from-blue-500/15 to-transparent",
            borderColor: "hover:border-blue-500/30",
            iconStyle: "text-blue-400 bg-blue-500/10 border-blue-500/20"
          },
          {
            label: "Total expenses",
            value: String(totalExpenses),
            icon: ReceiptText,
            color: "from-orange-500/15 to-transparent",
            borderColor: "hover:border-orange-500/30",
            iconStyle: "text-orange-400 bg-orange-500/10 border-orange-500/20",
            hasProgress: true
          },
        ].map(({ label, value, icon: Icon, color, borderColor, iconStyle, hasProgress }) => (
          <div 
            key={label} 
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-b ${color} to-card/40 p-5 shadow-xl transition-all duration-300 ${borderColor} hover:-translate-y-0.5`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">{label}</p>
                <h3 className="text-4xl font-mono font-black tracking-tighter">{value}</h3>
              </div>
              <div className={`rounded-xl border p-2 shadow-inner transition-transform group-hover:rotate-6 duration-300 ${iconStyle}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {hasProgress ? (
              <div className="mt-4 space-y-1">
                <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500" 
                    style={{ width: `${currentTierProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-bold text-muted-foreground/60 uppercase">
                  <span>Level Progress</span>
                  <span>{currentTierProgress}%</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider">Active Monitoring</span>
              </div>
            )}
          </div>
        ))}

        {/* Dynamic Interactive Quick Action Card */}
        <Link
          href={ROUTES.settlements}
          className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-background p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)] flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-2 text-primary shadow-[0_0_10px_rgba(var(--primary),0.15)]">
              <CircleDollarSign className="h-5 w-5 animate-[spin_8s_linear_infinite]" />
            </div>
            <div className="rounded-full bg-muted p-1 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4 group-hover:text-primary" />
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/90 block">Quick action</span>
            <h3 className="text-xl font-black uppercase tracking-tight mt-0.5 text-foreground">Settle up</h3>
          </div>
        </Link>
      </div>

      {/* Recent Groups Matrix Interface */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-foreground flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" /> Recent groups
          </h2>
          <Link
            href={ROUTES.groups}
            className="group flex items-center gap-0.5 text-[10px] font-black uppercase tracking-widest text-primary transition-all hover:tracking-wider"
          >
            View all <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/5 py-12 px-4 text-center">
            <div className="rounded-xl border border-dashed border-muted-foreground/30 p-2.5 text-muted-foreground/60 mb-3">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Create a group to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.slice(0, 4).map((group) => (
              <Link
                key={group.id}
                href={group.id ? ROUTES.groupDetail(group.id) : "#"}
                className="group relative block rounded-xl border border-border/60 bg-card/30 backdrop-blur-sm p-4 transition-all duration-200 hover:bg-muted/10 hover:border-primary/30"
              >
                {/* Visual side-rail marker */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-primary group-hover:h-1/2 transition-all duration-300 rounded-r" />
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {group.name}
                    </h4>
                    <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-muted-foreground/70">
                      <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5">
                        {group.members?.length ?? 0} members
                      </span>
                      <span className="text-muted-foreground/30">/</span>
                      <span>{group._count?.expenses ?? 0} expenses</span>
                    </div>
                  </div>
                  <div className="opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}} />
    </section>
  );
}