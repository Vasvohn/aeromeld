type Props = {
  variant?: "lockup" | "mark";
  className?: string;
};

export function BrandLogo({ variant = "lockup", className = "" }: Props) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const mark = `${base}/logo-mark.png`;
  const lockup = `${base}/logo.svg`;

  if (variant === "mark") {
    return (
      <img
        src={mark}
        alt="Aeromeld"
        width={36}
        height={36}
        className={`h-9 w-9 rounded-xl ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={mark}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-xl md:hidden"
      />
      <span className="ml-2 font-display text-lg font-extrabold tracking-tight text-slate-900 md:hidden">
        Aero<span className="text-sky-600">meld</span>
      </span>
      <img
        src={lockup}
        alt="Aeromeld — Compare. Book. Fly."
        width={240}
        height={38}
        className="hidden h-10 w-auto max-w-[240px] shrink-0 md:block"
      />
    </span>
  );
}
