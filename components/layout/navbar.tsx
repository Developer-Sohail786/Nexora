"use client";



import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <header className="w-full border-b border-white/6 bg-[#0F0D14] dark:bg-[#0F0D14]">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-6">
        <span className="text-lg font-bold tracking-tight text-white">
          Nexora AI
        </span>

        {/* <nav className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            <li className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white cursor-pointer">
              Features
            </li>

            <li className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white cursor-pointer">
              Pricing
            </li>

            <li className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white cursor-pointer">
              About
            </li>
          </ul>
        </nav> */}

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="text-[#9490A8] transition-colors hover:text-white cursor-pointer"
            aria-label="Toggle theme"
          >
            {/* <Moon size={18} /> */}
          </button>

          {status === "authenticated" ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white"
              >
                Dashboard
              </Link>

              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
                className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="rounded-lg bg-[#7C5CFC] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="text-sm font-medium text-[#9490A8] transition-colors duration-150 hover:text-white"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
