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
      "bg-[#76263d] hover:bg-[#641f31] text-white",

    secondary:
      "bg-white border border-[#76263d] text-[#76263d] hover:bg-[#FFF5F5]",
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