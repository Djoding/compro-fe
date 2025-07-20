export default function TeknaLogiIcon({ className = "w-8 h-8" }: Readonly<{ className?: string }>) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="teknalogi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* T Letter with modern design */}
      <path
        d="M6 8h20v3h-8.5v13h-3V11H6V8z"
        fill="url(#teknalogi-gradient)"
      />
      
      {/* Digital accent - dots representing pixels/digital */}
      <circle cx="26" cy="26" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="23" cy="26" r="1" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="23" r="1" fill="currentColor" opacity="0.4" />
      
      {/* Connection lines representing connectivity */}
      <path
        d="M25 25l-1-1m2 0l-1 1"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  );
}
