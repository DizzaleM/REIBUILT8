"use client";

import { FormEvent } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/components/providers/UiProvider";

export default function LoginPage() {
  const { setLoginNoticeOpen, pushToast } = useUi();

  const notify = (e?: FormEvent) => {
    e?.preventDefault();
    setLoginNoticeOpen(true);
    pushToast("Member authentication will be connected in a future development phase.");
  };

  return (
    <div>
      <PageHero title="Member Login" description="Authentication is mocked for this front-end phase." />
      <section className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <form onSubmit={notify} className="space-y-4 rounded-2xl border border-r8-border bg-r8-elevated p-6">
          <label className="block text-sm text-r8-secondary">
            Email
            <input type="email" required className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
          </label>
          <label className="block text-sm text-r8-secondary">
            Password
            <input type="password" required className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 text-r8-secondary">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="text-r8-blue-light" onClick={() => notify()}>
              Forgot password
            </button>
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <Button type="button" variant="secondary" className="w-full" onClick={() => notify()}>
            Create Account
          </Button>
          <div className="relative py-2 text-center text-xs uppercase tracking-[0.18em] text-r8-muted">
            Or continue with
          </div>
          <Button type="button" variant="dark" className="w-full" onClick={() => notify()}>
            Continue with Google
          </Button>
          <Button type="button" variant="dark" className="w-full" onClick={() => notify()}>
            Continue with Apple
          </Button>
        </form>
      </section>
    </div>
  );
}
