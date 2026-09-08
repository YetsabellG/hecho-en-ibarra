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
      "bg-[#C54B43] hover:bg-[#A53C35] text-white",

    secondary:
      "bg-white border border-[#C54B43] text-[#C54B43] hover:bg-[#FFF5F5]",
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