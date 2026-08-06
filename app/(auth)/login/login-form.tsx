"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth.schema";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { status } = useSession();
  const router = useRouter();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,

        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password.");
        return;
      }
      toast.success("Welcome back!");

      // router.push("/dashboard")
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
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="w-full rounded-lg border border-[#7C5CFC]/50 bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none transition-colors focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="text-xs text-[#7A748F]">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            aria-label="Password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white placeholder-[#5C5870] outline-none transition-colors focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          aria-label="Log in"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[#7C5CFC] py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] transition-all hover:bg-[#6B4EE8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-2 focus:ring-offset-[#111018]"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
