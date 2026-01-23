import React from "react";

interface GasTankGaugeProps {
  fillPercentage: number; // 0–100
  size?: number; // width and height of the SVG
}

export const GasTankGauge: React.FC<GasTankGaugeProps> = ({
  fillPercentage,
  size = 600,
}) => {
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2 - 10;
  const clampedFill = Math.min(100, Math.max(0, fillPercentage * 100));

  const angle = (clampedFill / 100) * Math.PI;
  const x = centerX + radius * Math.cos(Math.PI - angle);
  const y = centerY - radius * Math.sin(angle);

  return (
    <svg width={size} height={size / 2}>
      <path
        d={`
          M ${centerX - radius} ${centerY} 
          A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}
        `}
        fill="none"
        stroke="#fafafa"
        strokeWidth={8}
        strokeLinecap="round"
      />
      {[0, 25, 50, 75, 100].map((pct, i) => {
        const a = (pct / 100) * Math.PI;
        const cx = centerX + 0.5 * radius * Math.cos(Math.PI - a);
        const cy = centerY - 0.5 * radius * Math.sin(a);
        const tx = centerX + radius * Math.cos(Math.PI - a);
        const ty = centerY - radius * Math.sin(a);
        return (
          <line
            key={pct}
            x1={cx}
            y1={cy}
            x2={tx}
            y2={ty}
            stroke="#fafafa"
            strokeWidth={i % 2 == 0 ? 8 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1={centerX}
        y1={centerY}
        x2={x}
        y2={y}
        stroke="#ea580c"
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  );
};
