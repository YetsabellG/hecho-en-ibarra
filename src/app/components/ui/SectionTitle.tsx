type Props = {
  subtitle: string;
  title: string;
  description: string;
};

export default function SectionTitle({
  subtitle,
  title,
  description,
}: Props) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <p className="uppercase tracking-widest text-[#A94743] text-sm font-semibold mb-3">
        {subtitle}
      </p>

      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>

      <p className="text-gray-500 text-lg">
        {description}
      </p>
    </div>
  );
}