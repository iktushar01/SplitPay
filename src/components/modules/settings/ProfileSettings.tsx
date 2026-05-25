"use client";

import { changePasswordAction } from "@/actions/authActions/_changePasswordAction";
import { updateProfileAction } from "@/actions/authActions/_updateProfileAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthUser } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ProfileSettingsProps = {
  user: AuthUser;
};

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name.trim());

    const result = await updateProfileAction(formData);
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Profile updated");
    router.refresh();
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const result = await changePasswordAction({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Password changed");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleProfileUpdate}
        className="space-y-4 rounded-xl border bg-card p-6"
      >
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user.email} disabled />
        </div>
        <Button type="submit" disabled={loading}>
          Save profile
        </Button>
      </form>

      <form
        onSubmit={handlePasswordChange}
        className="space-y-4 rounded-xl border bg-card p-6"
      >
        <h2 className="text-lg font-semibold">Change password</h2>
        <div className="space-y-2">
          <Label>Current password</Label>
          <Input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm((f) => ({
                ...f,
                currentPassword: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label>New password</Label>
          <Input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))
            }
            required
            minLength={8}
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm new password</Label>
          <Input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm((f) => ({
                ...f,
                confirmPassword: e.target.value,
              }))
            }
            required
            minLength={8}
          />
        </div>
        <Button type="submit" variant="outline" disabled={loading}>
          Update password
        </Button>
      </form>
    </div>
  );
}
