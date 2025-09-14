export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NetStudyAI logo"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        d="M50 2.5 L95 27.5 V72.5 L50 97.5 L5 72.5 V27.5 Z"
        stroke="hsl(var(--border))"
        strokeWidth="4"
        fill="hsl(var(--card))"
      />
      <circle cx="50" cy="50" r="12" fill="url(#grad1)" />
      <path
        d="M38,50 A12,12 0 0,1 62,50"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
