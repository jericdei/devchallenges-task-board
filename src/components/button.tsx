"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  icon?: React.ReactNode;
}

export default function Button({
  variant,
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClassName = {
    primary: "bg-info-700",
    secondary: "bg-neutral-400",
  };

  return (
    <button
      className={`button-text flex items-center gap-2 rounded-full px-8 py-1 text-neutral-100 ${variantClassName[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}
