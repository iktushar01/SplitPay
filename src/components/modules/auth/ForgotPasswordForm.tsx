"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { forgotPasswordAction } from "@/actions/authActions/_forgotPasswordAction";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import AppField from "@/components/shared/form/ReUsableField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { forgotPasswordZodSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, ReceiptText, Mail, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPasswordAction,
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Failed to send reset code");
          return;
        }

        router.push(
          `/reset-password?email=${encodeURIComponent(value.email)}&sent=true`
        );
      } catch (error: any) {
        setServerError(error.message || "Failed to send reset code");
      }
    },
  });

  return (
    <main className="relative flex min-h-screen w-full flex-col lg:flex-row overflow-hidden bg-background">
      {/* 1. PREMIUM NEON MESH BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent to-muted/20 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5 pointer-events-none" />

      <nav className="absolute top-6 left-6 z-20">
        <Link href="/login">
          <Button
            variant="ghost"
            className="group gap-2 rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Button>
        </Link>
      </nav>

      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-20 z-10 relative bg-slate-50/50 dark:bg-slate-950/20 border-r border-border/50">
        <div className="relative space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="group relative flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-600 dark:bg-cyan-700 shadow-2xl shadow-cyan-600/20 transition-transform hover:rotate-3">
            <ReceiptText className="h-12 w-12 text-white transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl font-black tracking-tighter text-foreground leading-[1.1]">
              Secure <br />
              <span className="relative inline-block text-cyan-600 dark:text-cyan-400">
                Account.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-cyan-500/30"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 25 0 50 5 T 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-md text-xl font-medium text-muted-foreground leading-relaxed">
              We&apos;ll send a reset code to your verified email address so you can
              get back into your bills and shared balances safely.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center p-6 z-10 lg:justify-center lg:pr-32">
        <div className="w-full max-w-[520px] rounded-[2.5rem] border border-border bg-card/80 p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send a 6-digit reset code.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-secondary/40 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Verified email required
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  If your account exists and the email is verified, the server will
                  send a reset OTP. Unverified accounts need email verification first.
                </p>
              </div>
            </div>
          </div>

          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field
              name="email"
              validators={{ onChange: forgotPasswordZodSchema.shape.email }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  prepend={<Mail className="h-4 w-4" />}
                />
              )}
            </form.Field>

            {serverError && (
              <Alert
                variant="destructive"
                className="rounded-xl bg-destructive/5 border-destructive/20"
              >
                <AlertDescription>{serverError}</AlertDescription>
              </Alert>
            )}

            <form.Subscribe selector={(s) => [s.canSubmit] as const}>
              {([canSubmit]) => (
                <AppSubmitButton
                  isPending={isPending}
                  pendingLabel="Sending Reset Code..."
                  disabled={!canSubmit}
                >
                  Send Reset Code
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Remembered your password?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:underline underline-offset-4"
            >
              Go back to login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPasswordForm;
