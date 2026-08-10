"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#0F0D14] px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-bold text-white">Nexora AI</span>
        <div className="flex flex-wrap gap-6">
          <a href="#" className="text-xs text-[#5C5870] hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-[#5C5870] hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-[#5C5870] hover:text-white transition-colors">Security</a>
          <a href="#" className="text-xs text-[#5C5870] hover:text-white transition-colors">Status</a>
        </div>
        <span className="text-xs text-[#5C5870]">© 2024 Nexora AI Inc. All rights reserved.</span>
      </div>
    </footer>
  );
}