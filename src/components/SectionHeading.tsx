export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-moss">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
      {children ? <div className="mt-4 text-base leading-7 text-ink/68">{children}</div> : null}
    </div>
  );
}
