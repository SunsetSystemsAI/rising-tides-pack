import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const STEPS = [
  {
    number: "01",
    title: "You describe the task",
    description: "\"Build me a React dashboard with Stripe payments\"",
    icon: "💬",
  },
  {
    number: "02",
    title: "Claude matches skills",
    description: "Index lookup finds react-dev + stripe-integration",
    icon: "🔍",
  },
  {
    number: "03",
    title: "Skills load on-demand",
    description: "Full content loads only when needed — no context waste",
    icon: "⚡",
  },
  {
    number: "04",
    title: "MCPs activate",
    description: "Context7 for live docs, Stripe MCP for API operations",
    icon: "🔌",
  },
];

export const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [255, 285], [1, 0], {
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

      {/* Steps */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 60,
          padding: "0 80px",
        }}
      >
        {STEPS.map((step, i) => {
          const delay = 45 + i * 40;
          const stepScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 180, mass: 0.5 },
          });
          const stepOpacity = interpolate(frame, [delay, delay + 25], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          // Connection line animation
          const lineWidth = i < 3 ? interpolate(
            frame,
            [delay + 30, delay + 55],
            [0, 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          ) : 0;

          return (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 340,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: "32px 28px",
                  opacity: stepOpacity,
                  transform: `scale(${Math.min(stepScale, 1)})`,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Step number + icon */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 16,
                      color: COLORS.accentBright,
                      padding: "6px 12px",
                      background: `${COLORS.accent}20`,
                      borderRadius: 8,
                      letterSpacing: 2,
                    }}
                  >
                    {step.number}
                  </div>
                  <span style={{ fontSize: 32 }}>{step.icon}</span>
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 22,
                    fontWeight: 700,
                    color: COLORS.textBright,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: FONT.sans,
                    fontSize: 16,
                    color: COLORS.textMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </div>
              </div>

              {/* Connection arrow */}
              {i < 3 && (
                <div
                  style={{
                    width: 50,
                    height: 4,
                    marginLeft: -8,
                    marginRight: -8,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: `${lineWidth}%`,
                      height: "100%",
                      background: `linear-gradient(90deg, ${COLORS.accentBright}, ${COLORS.purple})`,
                      borderRadius: 2,
                      boxShadow: `0 0 10px ${COLORS.accent}60`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          fontFamily: FONT.sans,
          fontSize: 24,
          color: COLORS.textMuted,
          textAlign: "center",
          opacity: interpolate(frame, [180, 210], [0, 1], {
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
