"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "outline" | "black" | "gray";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "outline",
  className,
}) => {
  const baseStyles =
    "px-6 py-2 rounded-full transition font-medium text-sm cursor-pointer";

  const variantStyles = {
    outline: "border border-black text-black hover:bg-black hover:text-white",
    black: "bg-black text-white hover:bg-gray-800",
    gray: "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {label}
    </button>
  );
};

export default Button;
