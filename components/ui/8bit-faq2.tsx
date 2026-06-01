import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit-card";

export interface FAQItem {
  answer: string;
  question: string;
}

interface FAQ2Props {
  className?: string;
  description?: string;
  items?: FAQItem[];
  title?: string;
  onItemClick?: (item: FAQItem) => void; // Added an optional interactive handler
}

const defaultItems: FAQItem[] = [
  {
    question: "What do I get?",
    answer: "50+ retro-styled components, blocks, and a full registry. Copy, paste, ship.",
  },
  {
    question: "Is it free?",
    answer: "The core library is 100% open source. Premium blocks and themes coming soon.",
  },
  {
    question: "What frameworks?",
    answer: "Built for React and Next.js. Works with any project that uses shadcn/ui.",
  },
  {
    question: "How do I install?",
    answer: "Run the shadcn CLI: pnpm dlx shadcn@latest add @8bitcn/button. That's it.",
  },
  {
    question: "Can I customize?",
    answer: "Everything is yours. Copy the source, change the colors, modify the borders. No lock-in.",
  },
  {
    question: "Need help?",
    answer: "Join our Discord or open a GitHub issue. The community is active and friendly.",
  },
];

export default function FAQ2({
  title = "Quick Answers",
  description = "No scrolling through walls of text",
  items = defaultItems,
  className,
  onItemClick,
}: FAQ2Props) {
  return (
    <section className={cn("w-full px-1 py-4", className)}>
      <div className="mx-auto max-w-4xl">
        {(title || description) && (
          <div className="mb-4 text-center">
            {title && (
              <h2 className="retro-title mb-1 font-bold text-[10px] tracking-tight md:text-xs text-white uppercase">
                {title}
              </h2>
            )}
            {description && (
              <p className="retro mx-auto max-w-xl text-zinc-400 text-[8px] uppercase tracking-wider">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-x-2 gap-y-2 sm:grid-cols-2">
          {items.map((item) => (
            <div 
              key={item.question}
              onClick={() => onItemClick && onItemClick(item)}
              className={cn(onItemClick ? "cursor-pointer" : "")}
            >
              <Card className="hover:scale-[1.02] border-zinc-700 bg-zinc-950 p-3 h-full">
                <CardHeader className="pb-1 p-0 mb-1 border-b-0">
                  <CardTitle className="retro text-[9px] leading-snug font-bold text-white uppercase">
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-[8px] leading-relaxed text-zinc-400">
                  {item.answer}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
