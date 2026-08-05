"use client";

import { ChevronUp, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { AIModel } from "@/services/ai/types";
import { FREE_MODELS } from "@/services/subscription/subscription.constant";

type ModelOption = {
  id: AIModel;
  name: string;
};

interface ModelSelectorProps {
  isPro: boolean;
  models: ModelOption[];
  selectedModel: ModelOption;
  setSelectedModel: React.Dispatch<
    React.SetStateAction<ModelOption>
  >;
  showModels: boolean;
  setShowModels: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function isPremiumModel(modelId: string) {
  return !FREE_MODELS.includes(
    modelId as (typeof FREE_MODELS)[number],
  );
}

export default function ModelSelector({
  isPro,
  models,
  selectedModel,
  setSelectedModel,
  showModels,
  setShowModels,
}: ModelSelectorProps) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowModels((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#242034] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#2A2640]"
      >
        <Sparkles
          size={14}
          className="text-[#7C5CFC]"
        />

        <div className="flex items-center gap-2">
          <span>{selectedModel.name}</span>

          {isPremiumModel(selectedModel.id) && (
            <span className="rounded bg-[#7C5CFC]/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#B79BFF]">
              PRO
            </span>
          )}
        </div>

        <ChevronUp
          size={14}
          className={`text-[#7A748F] transition-transform duration-200 ${
            showModels ? "rotate-180" : ""
          }`}
        />
      </button>

      {showModels && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#1C1926] shadow-xl">
          {models.map((model) => {
            const premium =
              isPremiumModel(model.id);

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  if (
                    premium &&
                    !isPro
                  ) {
                    toast.info(
                      "Upgrade to Nexus Pro to use this AI model.",
                    );
                    return;
                  }

                  setSelectedModel(model);
                  setShowModels(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  premium && !isPro
                    ? "cursor-not-allowed opacity-70"
                    : "hover:bg-[#2A2640]"
                } ${
                  selectedModel.id ===
                  model.id
                    ? "text-[#7C5CFC]"
                    : "text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {premium && (
                    <Lock
                      size={12}
                      className="text-[#FACC15]"
                    />
                  )}

                  <span>{model.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  {premium && (
                    <span className="rounded bg-[#7C5CFC]/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-[#B79BFF]">
                      PRO
                    </span>
                  )}

                  {selectedModel.id ===
                    model.id && (
                    <span>✓</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}