import { fetchMyGroupsAction } from "@/actions/groupActions";
import { CreateGroupDialog } from "@/components/modules/groups/CreateGroupDialog";
import { GroupsList } from "@/components/modules/groups/GroupsList";

export default async function GroupsPage() {
  const result = await fetchMyGroupsAction();
  const groups = result.success ? result.data : [];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage your shared expense groups.
          </p>
        </div>
        <CreateGroupDialog />
      </div>

      {!result.success ? (
        <p className="text-sm text-destructive">{result.message}</p>
      ) : (
        <GroupsList groups={groups} />
      )}
    </section>
  );
}
