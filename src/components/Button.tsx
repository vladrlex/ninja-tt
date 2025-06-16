import { type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn.ts";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { buttonVariants } from "../utils/buttonVariants.js";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={props.disabled || isLoading}
        {...props}
      >
        {isLoading ? "..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
