type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-[#A94743] hover:bg-[#8F3F3B] text-white",

    secondary:
      "bg-white border border-[#A94743] text-[#A94743] hover:bg-[#FFF5F5]",
  };

  return (
    <button
      className={`
        px-6
        py-3
        rounded-full
        font-semibold
        transition-all
        duration-300
        shadow-sm
        hover:shadow-lg
        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}