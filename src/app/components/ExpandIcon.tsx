export const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // 👈 usa el color actual
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="3 17.3 3 21 6.7 21" />
    <line x1="10" y1="14" x2="3.8" y2="20.2" />
    <line x1="14" y1="10" x2="20.2" y2="3.8" />
    <polyline points="21 6.7 21 3 17.3 3" />
  </svg>
);