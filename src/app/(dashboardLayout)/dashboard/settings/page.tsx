import { ProfileSettings } from "@/components/modules/settings/ProfileSettings";
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account and SplitPay preferences.
        </p>
      </div>
      <ProfileSettings user={user} />
    </section>
  );
}
