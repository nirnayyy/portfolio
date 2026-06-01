"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Progress } from "@/components/ui/8bit-progress";

const DEFAULT_TIPS = [
  "Press any key to continue...",
  "Did you know? Saving often prevents lost progress!",
  "Tip: Explore every corner for hidden treasures.",
  "Remember to take breaks during long gaming sessions!",
  "Pro tip: Read the manual for secret moves.",
];

export interface LoadingScreenProps extends React.ComponentProps<"div"> {
  title?: string;
  tips?: string[];
  progress?: number;
  showPercentage?: boolean;
  tipInterval?: number;
  variant?: "default" | "fullscreen";
  autoProgress?: boolean;
  autoProgressDuration?: number;
}

export default function LoadingScreen({
  className,
  title = "LOADING",
  tips = DEFAULT_TIPS,
  progress = 0,
  showPercentage = true,
  tipInterval = 3000,
  variant = "default",
  autoProgress = false,
  autoProgressDuration = 5000,
  ...props
}: LoadingScreenProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [internalProgress, setInternalProgress] = useState(
    autoProgress ? 0 : progress
  );

  useEffect(() => {
    if (!autoProgress) {
      setInternalProgress(progress);
      return;
    }

    setInternalProgress(0);
    const step = 5;
    const steps = 100 / step;
    const intervalTime = autoProgressDuration / steps;

    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoProgress, autoProgressDuration, progress]);

  useEffect(() => {
    if (tips.length === 0) return;

    const tipTimer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, tipInterval);

    return () => clearInterval(tipTimer);
  }, [tips, tipInterval]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  const isFullscreen = variant === "fullscreen";
  const displayProgress = autoProgress ? internalProgress : progress;

  const content = (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-black border-4 border-white outline outline-2 outline-black -outline-offset-[6px] shadow-[8px_8px_0px_0px_#ffffff]">
      {/* Title */}
      <h2
        className={cn(
          "retro-title text-sm md:text-md text-center text-white font-bold",
          "animate-pulse"
        )}
      >
        {title}
        <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
      </h2>

      {/* Progress section */}
      <div className="w-full max-w-md space-y-2">
        {showPercentage && (
          <div className="flex justify-end">
            <span className="retro text-[9px] text-zinc-400 uppercase tracking-wide">
              {Math.round(displayProgress)}%
            </span>
          </div>
        )}
        <Progress
          value={displayProgress}
          variant="retro"
          progressBg="bg-white"
          className="h-5"
        />
      </div>

      {/* Tips section */}
      {tips.length > 0 && (
        <div className="w-full max-w-md min-h-[40px] flex items-center justify-center border-t border-dashed border-zinc-700 mt-2 pt-2">
          <p className="retro text-[8px] md:text-[9px] text-center text-zinc-400 leading-relaxed uppercase tracking-wider">
            {tips[currentTipIndex]}
          </p>
        </div>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-[999999] flex items-center justify-center bg-black p-4 font-mono",
          className
        )}
        {...props}
      >
        <div className="w-full max-w-lg">{content}</div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {content}
    </div>
  );
}
