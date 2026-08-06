"use client";

import { useForm } from "react-hook-form";
import AuthBranding from "../login/auth-branding";
import AuthDivider from "../login/auth-divider";
import SocialAuth from "../login/social-auth";
import { signupSchema } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignupFormData = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const { status } = useSession();

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Request failed. Please try again.");
        return;
      }
      toast.success(
        result.message || "Account created successfully. Welcome to Nexora!",
      );
      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0D14] px-4">
      <div className="w-full max-w-sm">
        <AuthBranding />

        <div className="rounded-2xl border border-white/[0.07] bg-[#1C1926] p-8 space-y-5">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">
              Create your account
            </h2>
            <p className="mt-1 text-xs text-[#7A748F]">
              Start for free. No credit card required.
            </p>
          </div>

          <SocialAuth />
          <AuthDivider />

          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-[#7A748F]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  aria-label="Full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Enter your name"
                  {...register("name")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none transition-colors focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs text-[#7A748F]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  aria-label="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none transition-colors focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs text-[#7A748F]"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  placeholder="Min. 6 characters"
                  {...register("password")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none transition-colors focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
                />
                {errors.password && (
                  <p id="password-error" className="mt-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  aria-invalid={!!errors.terms}
                  aria-describedby={errors.terms ? "terms-error" : undefined}
                  {...register("terms")}
                  className="mt-0.5 accent-[#7C5CFC]"
                />
                {errors.terms && (
                  <p id="terms-error" className="text-xs text-red-400">
                    {errors.terms.message}
                  </p>
                )}
                <label
                  htmlFor="terms"
                  className="text-xs text-[#7A748F] leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    aria-label="Terms of Service"
                    className="text-[#7C5CFC] hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    aria-label="Terms of Service"
                    className="text-[#7C5CFC] hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                aria-label="Create account"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#7C5CFC] py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] transition-all hover:bg-[#6B4EE8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[#7A748F]">
            Already have an account?{" "}
            <Link
              aria-label="Log in"
              href="/login"
              className="font-semibold text-[#7C5CFC] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
