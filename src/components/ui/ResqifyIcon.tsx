const ResQifyLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 8 L100 24 L100 66 C100 90 82 104 60 112 C38 104 20 90 20 66 L20 24 Z"
      fill="#2a1010"
    />
    <path
      d="M60 8 L100 24 L100 66 C100 90 82 104 60 112 C38 104 20 90 20 66 L20 24 Z"
      stroke="#ff3b3b"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M60 20 L90 34 L90 66 C90 86 75 97 60 104 C45 97 30 86 30 66 L30 34 Z"
      stroke="#ff3b3b"
      strokeWidth="1"
      strokeLinejoin="round"
      opacity="0.15"
    />

    <rect x="51" y="56" width="18" height="6" rx="3" fill="#ff3b3b" />
    <rect x="57" y="50" width="6" height="18" rx="3" fill="#ff3b3b" />
  </svg>
);

export default ResQifyLogo;
