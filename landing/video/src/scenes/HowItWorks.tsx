import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const STEPS = [
  {
    label: "Describe your task",
    icon: "💬",
  },
  {
    label: "Claude matches skills",
    icon: "🔍",
  },
  {
    label: "Skills load on-demand",
    icon: "⚡",
  },
];

export const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out at end of 360 frame duration
  const fadeOut = interpolate(frame, [310, 360], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Flow line animation
  const flowProgress = interpolate(frame, [120, 200], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
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
          How It Works
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          Automatic Skill Discovery
        </div>
      </div>

      {/* Flow diagram */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 40,
        }}
      >
        {STEPS.map((step, i) => {
          const delay = 50 + i * 55;
          const stepScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 180, mass: 0.5 },
          });
          const stepOpacity = interpolate(frame, [delay, delay + 25], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {/* Step card */}
              <div
                style={{
                  width: 320,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: "36px 32px",
                  opacity: stepOpacity,
                  transform: `scale(${Math.min(stepScale, 1)})`,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.3)`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{step.icon}</div>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 22,
                    fontWeight: 600,
                    color: COLORS.textBright,
                  }}
                >
                  {step.label}
                </div>
              </div>

              {/* Arrow */}
              {i < 2 && (
                <div
                  style={{
                    width: 80,
                    height: 4,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: `${Math.max(0, flowProgress - i * 30)}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${COLORS.accentBright}, ${COLORS.purple})`,
                      borderRadius: 2,
                      boxShadow: `0 0 10px ${COLORS.accent}60`,
                    }}
                  />
                  {/* Arrow head */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: -6,
                      fontSize: 20,
                      color: COLORS.purple,
                      opacity: flowProgress > 60 + i * 30 ? 1 : 0,
                    }}
                  >
                    →
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key benefit */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          textAlign: "center",
          opacity: interpolate(frame, [200, 230], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 26,
            color: COLORS.textMuted,
          }}
        >
          You only pay context cost for{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 600 }}>what you use</span>.
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          fontFamily: FONT.sans,
          fontSize: 24,
          color: COLORS.textMuted,
          textAlign: "center",
          opacity: interpolate(frame, [240, 270], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        No slash commands. No manual loading.{" "}
        <span style={{ color: COLORS.accentBright }}>Just describe what you need.</span>
      </div>
    </AbsoluteFill>
  );
};
