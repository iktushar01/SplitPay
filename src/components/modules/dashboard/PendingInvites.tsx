"use client";

import {
  acceptInviteAction,
  declineInviteAction,
} from "@/actions/inviteActions";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";
import type { GroupInvite } from "@/services/invites/invites.service";
import { Mail, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type PendingInvitesProps = {
  invites: GroupInvite[];
};

export function PendingInvites({ invites }: PendingInvitesProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (invites.length === 0) return null;

  const handleAccept = async (inviteId: string) => {
    setLoadingId(inviteId);
    const result = await acceptInviteAction(inviteId);
    setLoadingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.push(ROUTES.groupDetail(result.data?.id ?? ""));
    router.refresh();
  };

  const handleDecline = async (inviteId: string) => {
    setLoadingId(inviteId);
    const result = await declineInviteAction(inviteId);
    setLoadingId(null);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Invitation declined");
    router.refresh();
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Group invitations</h2>
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
          {invites.length}
        </span>
      </div>
      <div className="space-y-3">
        {invites.map((invite) => (
          <div
            key={invite.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </span>
              <div>
                <p className="font-medium">{invite.group.name}</p>
                <p className="text-sm text-muted-foreground">
                  Invited by {invite.invitedBy.name}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={loadingId === invite.id}
                onClick={() => handleDecline(invite.id)}
              >
                Decline
              </Button>
              <Button
                size="sm"
                disabled={loadingId === invite.id}
                onClick={() => handleAccept(invite.id)}
              >
                Accept
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
