import { fetchMyGroupsAction } from "@/actions/groupActions";
import { CreateGroupDialog } from "@/components/modules/groups/CreateGroupDialog";
import { GroupsList } from "@/components/modules/groups/GroupsList";
import { Layers, ShieldAlert } from "lucide-react";

export default async function GroupsPage() {
  const result = await fetchMyGroupsAction();
  const groups = result.success ? result.data : [];

  return (
    <section className="relative space-y-8 w-full py-6 px-4 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Sci-Fi Decorative Grid Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 -z-10 h-[200px] w-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      {/* Modern Header Terminal */}
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-border/60 bg-background/50 backdrop-blur-md p-6 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] overflow-hidden">
        <div className="absolute top-0 left-0 h-[2px] w-20 bg-gradient-to-r from-primary to-transparent" />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              Groups
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-muted-foreground uppercase">
              <Layers className="h-2.5 w-2.5" /> Registry
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wide">
            Create and manage your shared expense groups.
          </p>
        </div>
        
        {/* Wrapper styling context ensures the action matches button design guidelines */}
        <div className="relative group shrink-0">
          <CreateGroupDialog />
        </div>
      </div>

      {/* Dynamic Main Engine Data Render */}
      <div className="w-full">
        {!result.success ? (
          <div className="relative overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-5 backdrop-blur-sm flex items-center gap-3">
            <div className="absolute top-0 left-0 h-full w-[3px] bg-destructive" />
            <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-2 text-destructive">
              <ShieldAlert className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-destructive/80">System Exception</p>
              <p className="text-xs font-bold font-mono text-destructive mt-0.5">{result.message}</p>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-100 fill-mode-both">
            <GroupsList groups={groups} />
          </div>
        )}
      </div>

    </section>
  );
}