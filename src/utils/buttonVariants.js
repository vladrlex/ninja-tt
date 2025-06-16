import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        ghost: "text-blue-600 hover:underline bg-transparent",
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
        danger: "bg-red-600 text-white hover:bg-red-700",
        subtle: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        icon: "bg-red-600/80 text-white hover:bg-red-600 p-1.5 rounded-lg",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        full: "w-full py-2",
        icon: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);