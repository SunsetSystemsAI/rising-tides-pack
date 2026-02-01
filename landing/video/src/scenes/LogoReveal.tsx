import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const waveScale = spring({
    frame: frame - 8, fps,
    config: { damping: 8, stiffness: 200, mass: 0.5 },
  });

  // Much brighter burst
  const burstOpacity = interpolate(frame, [8, 18, 55], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const burstScale = interpolate(frame, [8, 50], [0.3, 3], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const brandText = "Rising Tides";
  const brandStart = 30;

  const tagOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [70, 90], [15, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [140, 165], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Bright orange burst */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.accentHot}90 0%, ${COLORS.accentBright}60 25%, ${COLORS.accent}30 50%, transparent 70%)`,
          opacity: burstOpacity,
          transform: `scale(${burstScale})`,
          filter: "blur(30px)",
        }}
      />

      <div style={{ textAlign: "center", position: "relative" }}>
        {/* The ~ wave — much stronger glow */}
        <div
          style={{
            fontSize: 150,
            fontFamily: FONT.mono,
            color: COLORS.accentBright,
            transform: `scale(${Math.max(0, waveScale)})`,
            textShadow: `
              0 0 30px ${COLORS.accentBright},
              0 0 60px ${COLORS.accent}cc,
              0 0 120px ${COLORS.accent}80,
              0 0 200px ${COLORS.accentDim}40
            `,
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          ~
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 82,
            fontFamily: FONT.mono,
            fontWeight: 700,
            color: COLORS.textBright,
            letterSpacing: -2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {brandText.split("").map((char, i) => {
            const charFrame = brandStart + i * 3;
            const charOpacity = interpolate(frame, [charFrame, charFrame + 8], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });
            const charY = interpolate(frame, [charFrame, charFrame + 8], [20, 0], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            return (
              <span
                key={i}
                style={{
                  opacity: charOpacity,
                  transform: `translateY(${charY}px)`,
                  display: "inline-block",
                  minWidth: char === " " ? 22 : undefined,
                  textShadow: `0 0 20px ${COLORS.accentBright}40`,
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontFamily: FONT.sans,
            color: COLORS.purpleBright,
            opacity: tagOpacity,
            transform: `translateY(${tagY}px)`,
            marginTop: 22,
            letterSpacing: 2,
          }}
        >
          A rising tide lifts all boats.
        </div>
      </div>
    </AbsoluteFill>
  );
};
