"use client";

import AuthBranding from "./auth-branding";
import SocialAuth from "./social-auth";
import AuthDivider from "./auth-divider";
import LoginForm from "./login-form";
import AuthFooter from "./auth-footer";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0D14] px-4">
      <div className="w-full max-w-sm">

        <AuthBranding />

        <div className="rounded-2xl border border-white/[0.07] bg-[#1C1926] p-8 space-y-5">
          <h2 className="text-center text-lg font-semibold text-white">Welcome back</h2>
          <SocialAuth />
          <AuthDivider />
          <LoginForm />
          <AuthFooter />
        </div>

      </div>
    </div>
  );
}