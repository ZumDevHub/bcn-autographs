import React from "react";

export const ExpandIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"   // 👈 color controlado por Tailwind
    strokeWidth={1.91}
    strokeMiterlimit={10}
    className={className}   // 👈 Tailwind classes pasan directo al svg
    {...props}
  >
    <circle cx="9.14" cy="9.14" r="7.64" />
    <line x1="22.5" y1="22.5" x2="14.39" y2="14.39" />
    <line x1="5.32" y1="9.14" x2="12.95" y2="9.14" />
    <line x1="9.14" y1="5.32" x2="9.14" y2="12.95" />
  </svg>
);