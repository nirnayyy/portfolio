import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  variant?: "default" | "retro"
  progressBg?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, variant = "retro", progressBg = "bg-white", ...props }, ref) => {
    // Clamp progress between 0 and 100
    const clampedValue = Math.max(0, Math.min(100, value))
    
    // Retro progress displays a blocky pixelated line
    const isRetro = variant === "retro"

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden bg-zinc-950",
          isRetro 
            ? "border-4 border-white outline outline-2 outline-black -outline-offset-[6px] p-[2px]" 
            : "h-4 rounded-full border border-zinc-850",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            isRetro ? "bg-white" : progressBg
          )}
          style={{ 
            width: `${clampedValue}%`,
            // Create blocky segments in retro mode
            backgroundImage: isRetro 
              ? "linear-gradient(90deg, transparent 90%, #000000 90%)" 
              : "none",
            backgroundSize: "20px 100%"
          }}
        />
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
