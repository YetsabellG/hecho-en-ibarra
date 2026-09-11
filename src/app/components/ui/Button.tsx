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
      "bg-[#891C20] hover:bg-[#75181c] text-white",

    secondary:
      "bg-white border border-[#891C20] text-[#891C20] hover:bg-[#FFF5F5]",
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