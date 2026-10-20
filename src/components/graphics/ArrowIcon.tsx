import { cn } from "@/lib/cn";

type ArrowIconProps = {
  className?: string;
};

export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-5 shrink-0", className)}
    >
      <path className="traco-marca" d="M4 12 C9 11 14 11 19 12 M14 7 C16 9 18 11 19 12 C18 13 16 15 14 17" />
    </svg>
  );
}
