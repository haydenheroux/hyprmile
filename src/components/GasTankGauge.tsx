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

  const thick = 8; // start width
  const thin = 3; // end width

  const dx = x - centerX;
  const dy = y - centerY;
  const len = Math.sqrt(dx * dx + dy * dy);

  // unit perpendicular vector
  const px = -dy / len;
  const py = dx / len;

  // half widths
  const t0 = thick / 2;
  const t1 = thin / 2;

  // path points
  const x1a = centerX + px * t0;
  const y1a = centerY + py * t0;
  const x1b = centerX - px * t0;
  const y1b = centerY - py * t0;

  const x2a = x + px * t1;
  const y2a = y + py * t1;
  const x2b = x - px * t1;
  const y2b = y - py * t1;

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
      <path
        d={`
    M ${x1a} ${y1a}
    L ${x2a} ${y2a}
    Q ${x} ${y} ${x2b} ${y2b}
    L ${x1b} ${y1b}
    Q ${centerX} ${centerY} ${x1a} ${y1a}
    Z
  `}
        fill="#ea580c"
      />
    </svg>
  );
};
