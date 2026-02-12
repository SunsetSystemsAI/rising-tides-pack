import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT } from "../theme";

export const ContextEfficiency: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out at end of 300 frame duration
  const fadeOut = interpolate(frame, [260, 300], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "187" animation
  const stat1Scale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 8, stiffness: 200, mass: 0.4 },
  });
  const stat1Opacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "~7%" animation (hero stat)
  const stat2Scale = spring({
    frame: frame - 90,
    fps,
    config: { damping: 6, stiffness: 180, mass: 0.5 },
  });
  const stat2Opacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "Not 40%" comparison
  const comparisonOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Bottom benefit text
  const benefitOpacity = interpolate(frame, [190, 220], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            color: COLORS.accentBright,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 12,
            textShadow: `0 0 20px ${COLORS.accent}50`,
          }}
        >
          The Magic
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          Context Efficiency
        </div>
      </div>

      {/* Main stats area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 120,
          paddingTop: 40,
        }}
      >
        {/* 187 Skills */}
        <div
          style={{
            textAlign: "center",
            opacity: stat1Opacity,
            transform: `scale(${Math.min(stat1Scale, 1)})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 120,
              fontWeight: 700,
              color: COLORS.textBright,
              lineHeight: 1,
              textShadow: `0 0 30px ${COLORS.accentBright}60, 0 0 60px ${COLORS.accent}30`,
            }}
          >
            187
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 20,
              color: COLORS.textMuted,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginTop: 18,
            }}
          >
            Skills Available
          </div>
        </div>

        {/* ~7% Context Cost (Hero Stat) */}
        <div
          style={{
            textAlign: "center",
            opacity: stat2Opacity,
            transform: `scale(${Math.min(stat2Scale, 1)})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 180,
              fontWeight: 700,
              color: COLORS.accentBright,
              lineHeight: 1,
              textShadow: `
                0 0 50px ${COLORS.accentBright},
                0 0 100px ${COLORS.accent}cc,
                0 0 180px ${COLORS.accent}50
              `,
            }}
          >
            ~7%
          </div>
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 20,
              color: COLORS.accentWarm,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginTop: 18,
              textShadow: `0 0 15px ${COLORS.accentWarm}50`,
            }}
          >
            Context Cost
          </div>
        </div>
      </div>

      {/* "Not 40%. Seven." comparison */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: comparisonOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 32,
            color: COLORS.textMuted,
          }}
        >
          Not{" "}
          <span
            style={{
              color: COLORS.red,
              textDecoration: "line-through",
              opacity: 0.7,
            }}
          >
            40%
          </span>
          .{" "}
          <span
            style={{
              color: COLORS.accentBright,
              fontWeight: 700,
              textShadow: `0 0 20px ${COLORS.accent}60`,
            }}
          >
            Seven
          </span>
          .
        </div>
      </div>

      {/* Benefit statement */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: benefitOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 28,
            color: COLORS.textMuted,
          }}
        >
          More room for{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 700 }}>
            your actual work
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
