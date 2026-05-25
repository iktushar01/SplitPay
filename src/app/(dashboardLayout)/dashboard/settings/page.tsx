import { ProfileSettings } from "@/components/modules/settings/ProfileSettings";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { getUserInfo } from "@/services/auth/auth.services";
import { ROUTES } from "@/config/routes";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect(ROUTES.login);
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your account and SplitPay preferences.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm font-medium text-foreground">Theme</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Switch between light, dark, and system modes.
          </p>
          <div className="mt-3">
            <ModeToggle />
          </div>
        </div>
      </div>
      <ProfileSettings user={user} />
    </section>
  );
}
