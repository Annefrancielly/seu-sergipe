export type ButtonVariant = "primary" | "secondary" | "link";

const pillBase =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-semibold " +
  "transition-[translate,scale,background-color,color] duration-300 ease-organic " +
  "motion-safe:hover:-translate-y-0.5 active:scale-[0.97]";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: `${pillBase} bg-action text-on-action`,
  secondary: `${pillBase} border-2 border-current text-ink hover:bg-ink/10`,
  link: "group inline-flex min-h-12 items-center gap-2 font-semibold underline decoration-1 underline-offset-4",
};

export const arrowMotionClasses =
  "transition-transform duration-300 ease-organic group-hover:translate-x-1 group-focus-visible:translate-x-1";
