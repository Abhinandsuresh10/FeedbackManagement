import React from "react";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none 
      focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 
      ${fullWidth ? "w-full" : ""} 
      ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
      ${className}`}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default Button;
