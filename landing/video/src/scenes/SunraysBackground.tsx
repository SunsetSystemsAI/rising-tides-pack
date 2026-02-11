import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../theme";

export const SunraysBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow rotation over entire video (75 seconds)
  const rotation = interpolate(frame, [0, 2250], [0, 15]);

  // Intensity peaks at key moments: logo reveal, architecture, context stats, CTA
  const intensity = interpolate(
    frame,
    [0, 225, 280, 375, 645, 975, 1245, 1605, 1845, 2025, 2250],
    [0.5, 0.5, 1.0, 0.6, 0.7, 0.75, 0.7, 0.85, 0.8, 1.0, 0.9]
  );

  // Subtle pulsing of the sun orb
  const orbPulse = interpolate(
    frame,
    [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2250],
    [1, 1.05, 1, 1.04, 1, 1.06, 1, 1.05, 1, 1.04, 1.08, 1.03]
  );

  // 16 light rays
  const rayCount = 16;
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const baseAngle = (i / (rayCount - 1)) * 170 - 85;
    const isOrange = i % 3 !== 2;
    const color = isOrange ? COLORS.accentBright : COLORS.purpleBright;
    const baseOpacity = isOrange
      ? (i % 2 === 0 ? 0.18 : 0.12)
      : 0.09;
    const width = i % 4 === 0 ? 6 : i % 3 === 0 ? 8 : 3;
    const blur = i % 4 === 0 ? 25 : i % 3 === 0 ? 40 : 18;

    // Individual ray intensity varies over time
    const rayIntensity = interpolate(
      frame + i * 20,
      [0, 400, 800, 1200, 1600, 2000, 2250],
      [0.8, 1.2, 0.9, 1.1, 0.95, 1.15, 1.0]
    );

    const opacity = Math.min(baseOpacity * intensity * rayIntensity, 1);

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: "-5%",
          left: "50%",
          width: `${width}px`,
          height: "170%",
          background: `linear-gradient(180deg, ${color} 0%, ${color}80 20%, ${color}20 50%, transparent 75%)`,
          transformOrigin: "top center",
          transform: `translateX(-50%) rotate(${baseAngle + rotation}deg)`,
          filter: `blur(${blur}px)`,
          opacity,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Deep space base */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${COLORS.bgRaised} 0%, ${COLORS.bg} 40%)`,
        }}
      />

      {/* Purple sky gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 100% 60% at 50% -5%, ${COLORS.purple}50 0%, ${COLORS.purple}15 30%, transparent 60%)`,
          opacity: intensity,
        }}
      />

      {/* Sun orb — hot, bright center */}
      <div
        style={{
          position: "absolute",
          top: "-18%",
          left: "50%",
          transform: `translateX(-50%) scale(${orbPulse})`,
          width: 650,
          height: 650,
          borderRadius: "50%",
          background: `radial-gradient(circle,
            ${COLORS.accentHot}${Math.round(0.6 * intensity * 255).toString(16).padStart(2, "0")} 0%,
            ${COLORS.accentBright}${Math.round(0.45 * intensity * 255).toString(16).padStart(2, "0")} 10%,
            ${COLORS.accent}${Math.round(0.3 * intensity * 255).toString(16).padStart(2, "0")} 25%,
            ${COLORS.accentDim}${Math.round(0.12 * intensity * 255).toString(16).padStart(2, "0")} 40%,
            transparent 60%
          )`,
          filter: "blur(15px)",
        }}
      />

      {/* Outer bloom layers */}
      <div
        style={{
          position: "absolute",
          top: "-12%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 450,
          height: 450,
          borderRadius: "50%",
          boxShadow: `
            0 0 50px 20px rgba(254, 243, 199, ${0.2 * intensity}),
            0 0 100px 40px rgba(252, 211, 77, ${0.25 * intensity}),
            0 0 180px 70px rgba(245, 158, 11, ${0.2 * intensity}),
            0 0 300px 120px rgba(245, 158, 11, ${0.1 * intensity}),
            0 0 80px 35px rgba(139, 92, 246, ${0.15 * intensity}),
            0 0 250px 100px rgba(139, 92, 246, ${0.08 * intensity})
          `,
        }}
      />

      {/* Light rays */}
      {rays}

      {/* Horizon warm band */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "0",
          right: "0",
          height: 250,
          background: `linear-gradient(180deg, rgba(245, 158, 11, ${0.12 * intensity}) 0%, rgba(139, 92, 246, ${0.04 * intensity}) 50%, transparent 100%)`,
          filter: "blur(25px)",
        }}
      />
    </AbsoluteFill>
  );
};
