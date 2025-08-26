import React, { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string; // allow arbitrary tailwind or other classes
};

/**
 * A versatile Button component with variant + size props and support for custom Tailwind classes.
 * - variant: visual style
 * - size: padding / font-size
 * - fullWidth: stretches to 100%
 * - loading: shows a spinner and disables the button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    className = "",
    children,
    ...rest
  },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 cursor-pointer",
    secondary:
      "bg-neutral-700 text-white hover:bg-neutral-600 focus:ring-neutral-500 cursor-pointer",
    ghost: "bg-transparent text-white hover:bg-white/5 focus:ring-white/20 cursor-pointer",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 ",
    link: "bg-transparent text-blue-500 underline-offset-4 hover:underline px-0 py-0",
  };

  const sizes: Record<Size, string> = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = [base, variants[variant], sizes[size], fullWidth ? "w-full" : "inline-flex", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading ? true : undefined}
      {...rest}
    >
      {loading && (
        <svg
          className="-ml-1 mr-2 h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}

      <span className="flex items-center">{children}</span>
    </button>
  );
});

export default Button;
