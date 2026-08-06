"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

type ProfileSettingsProps = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
  } | null;
};

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [username, setUsername] = useState(user?.username ?? user?.name ?? "");
  const [loading, setLoading] = useState(false);
  const [image, setImage]= useState(user?.image ?? "")

  const handleSave = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

     toast.success("Your profile has been updated.");
    } catch {
      toast.error("Unable to update your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#1C1926] p-6">
      <h2 className="mb-6 text-base font-semibold text-white">
        Personal Information
      </h2>

      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
  if (
    result.info &&
    typeof result.info === "object" &&
    "secure_url" in result.info
  ) {
    const imageUrl = String(result.info.secure_url);

    setImage(imageUrl);
   toast.success("Image uploaded successfully.");
  }
}}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#2A2640]">
                  {user?.image ? (
                    <Image
                      src={image}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-[#7A748F]" />
                  )}
                </div>

                <span className="rounded-lg bg-[#7C5CFC] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer">Upload Photo</span>
              </button>
            )}
          </CldUploadWidget>

          {/* <div>Upload Photo</div> */}
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs text-[#7A748F]">
                First Name
              </label>

              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white outline-none focus:border-[#7C5CFC] transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs text-[#7A748F]">
                Last Name
              </label>

              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white outline-none focus:border-[#7C5CFC] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[#7A748F]">
              Username
            </label>

            <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5">
              <span className="text-sm text-[#5C5870]">@</span>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[#7A748F]">
              Email Address
            </label>

            <input
              value={user?.email ?? ""}
              disabled
              className="w-full rounded-lg border border-white/[0.07] bg-[#2A2640] px-3 py-2.5 text-sm text-white outline-none"
            />

            <p className="mt-1.5 text-xs text-[#5C5870]">
              Contact support to change your email.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="rounded-lg bg-[#7C5CFC] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(124,92,252,0.35)] hover:bg-[#6B4EE8] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
