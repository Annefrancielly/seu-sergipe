import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
};

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("size-6", className)}>
      <path className="traco-marca" d="M3.6 20.4 L4.9 16.3 A8.6 8.6 0 1 1 7.7 19.1 Z" />
      <path
        fill="currentColor"
        d="M9.3 7.6c.4-.4 1-.3 1.3.2l.9 1.5c.2.4.2.9-.1 1.2l-.6.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.6c.3-.3.8-.4 1.2-.1l1.5.9c.5.3.6.9.2 1.3l-.7.7c-.6.6-1.6.8-2.4.5-2.3-.9-4.1-2.7-5-5-.3-.8-.1-1.8.5-2.4z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("size-6", className)}>
      <rect className="traco-marca" x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle className="traco-marca" cx="12" cy="12" r="4" />
      <circle fill="currentColor" cx="17.1" cy="6.9" r="1.2" />
    </svg>
  );
}
