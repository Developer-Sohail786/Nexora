"use client";
import Link from "next/link";

export default function AuthFooter() {
  return (
    <p className="text-center text-sm text-[#7A748F]">
      Don&apos;t have an account?{" "}
      
      <Link href="/register" className="font-semibold text-[#7C5CFC] hover:underline">
        Sign up
      </Link>
    </p>
  );
}