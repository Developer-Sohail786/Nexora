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
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push("/dashboard");
      
    } catch{
      toast.error("Something went wrong");
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
                  type="text"
                  placeholder="Enter your name"
                  {...register("name")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none focus:border-[#7C5CFC] transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-[#7A748F]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none focus:border-[#7C5CFC] transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs text-[#7A748F]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  {...register("password")}
                  className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none focus:border-[#7C5CFC] transition-colors"
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms")}
                  className="mt-0.5 accent-[#7C5CFC]"
                />
                {errors.terms && (
                  <p className="text-xs text-red-400">{errors.terms.message}</p>
                )}
                <label
                  htmlFor="terms"
                  className="text-xs text-[#7A748F] leading-relaxed"
                >
                  I agree to the{" "}
                  <a href="#" className="text-[#7C5CFC] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#7C5CFC] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#7C5CFC] py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-[#7A748F]">
            Already have an account?{" "}
            <Link href="/login"
              
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
