const VARIANTS = {
  dusk: "from-[#2c3440] via-[#1a1712] to-[#0e0d0a]",
  night: "from-[#181a22] via-[#15130f] to-[#0e0d0a]",
  interior: "from-[#241d14] via-[#181310] to-[#0e0d0a]",
  ember: "from-[#3a2415] via-[#1c150f] to-[#0e0d0a]",
} as const;

type Variant = keyof typeof VARIANTS;

export function Scene({
  variant = "dusk",
  className = "",
  glow = true,
  silhouette = true,
  label,
}: {
  variant?: Variant;
  className?: string;
  glow?: boolean;
  silhouette?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`grain relative overflow-hidden bg-gradient-to-br ${VARIANTS[variant]} ${className}`}
    >
      {glow && (
        <div
          className="absolute -bottom-1/4 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--color-ember) 0%, transparent 70%)",
          }}
        />
      )}
      {silhouette && (
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full opacity-[0.14]"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <path
            d="M60 300V150L200 40l140 110v150"
            stroke="var(--color-paper)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M150 300V190h100v110"
            stroke="var(--color-paper)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M170 300v-60h60v60"
            stroke="var(--color-ember-glow)"
            strokeWidth="2"
            fill="var(--color-ember)"
            fillOpacity="0.5"
          />
        </svg>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
      {label && (
        <span className="absolute bottom-4 left-4 font-body text-[11px] uppercase tracking-[0.2em] text-paper/40">
          {label}
        </span>
      )}
    </div>
  );
}
