"use client";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  preview?: React.ReactNode;
  link?: { label: string; href: string };
}

export default function FeatureCard({ icon, title, description, preview, link }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1C1926] p-6 flex flex-col gap-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2A2640]">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-sm text-[#7A748F] leading-relaxed">{description}</p>
      </div>
      {preview && <div>{preview}</div>}
      {link && (
        <a href={link.href} className="text-sm text-[#7C5CFC] hover:underline mt-auto">
          {link.label}
        </a>
      )}
    </div>
  );
}