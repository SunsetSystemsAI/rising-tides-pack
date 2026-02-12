import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT } from "../theme";

const STATS = [
  {
    number: "187",
    label: "Skills Available",
    sub: "All indexed, all discoverable",
    isHero: false,
  },
  {
    number: "~7%",
    label: "Context Cost",
    sub: "Not 40%. Seven percent.",
    isHero: true,
  },
  {
    number: "0",
    label: "Manual Loading",
    sub: "Auto-discovery handles it",
    isHero: false,
  },
];

export const ContextEfficiency: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [225, 255], [1, 0], {
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

      {/* Stats */}
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
          gap: 80,
          paddingTop: 40,
        }}
      >
        {STATS.map((stat, i) => {
          const delay = 40 + i * 45;
          const numScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 8, stiffness: 200, mass: 0.4 },
          });
          const opacity = interpolate(frame, [delay, delay + 25], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });
          const subOpacity = interpolate(frame, [delay + 25, delay + 45], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity,
                transform: `scale(${Math.min(numScale, 1)})`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: stat.isHero ? 180 : 120,
                  fontWeight: 700,
                  color: stat.isHero ? COLORS.accentBright : COLORS.textBright,
                  lineHeight: 1,
                  textShadow: stat.isHero
                    ? `0 0 50px ${COLORS.accentBright}, 0 0 100px ${COLORS.accent}cc, 0 0 180px ${COLORS.accent}50`
                    : `0 0 30px ${COLORS.accentBright}60, 0 0 60px ${COLORS.accent}30`,
                }}
              >
                {stat.number}
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
                {stat.label}
              </div>

              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 18,
                  color: stat.isHero ? COLORS.accentWarm : COLORS.textMuted,
                  marginTop: 10,
                  opacity: subOpacity,
                  textShadow: stat.isHero ? `0 0 15px ${COLORS.accentWarm}50` : "none",
                }}
              >
                {stat.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefit statement */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [160, 190], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 28,
            color: COLORS.textMuted,
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          More context for{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 700 }}>your actual work</span>.
          <br />
          Less wasted on skill overhead.
        </div>
      </div>
    </AbsoluteFill>
  );
};
