import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const LAYERS = [
  {
    label: "SKILLS",
    count: "180",
    description: "Knowledge files that teach Claude workflows, patterns, and best practices",
    examples: ["React Dev", "Stripe", "SEO Audit", "Database Schema", "Copywriting", "+175 more"],
    color: COLORS.accentBright,
    icon: "📚",
  },
  {
    label: "PLUGINS",
    count: "37",
    description: "Bundles that combine skill + MCP config for zero-config setup",
    examples: ["Context7 Docs", "Playwright Tests", "Browser Control", "GitHub Flow", "Video Gen"],
    color: COLORS.purpleBright,
    icon: "🔌",
  },
  {
    label: "MCPs",
    count: "17",
    description: "Rich API operations — live docs, browser control, video generation",
    examples: ["context7", "playwright", "remotion", "memory", "github", "shadcn"],
    color: COLORS.accentWarm,
    icon: "⚡",
  },
  {
    label: "CLIs",
    count: "9",
    description: "Authentication flows and simple operations for external services",
    examples: ["gh", "stripe", "vercel", "netlify", "firebase", "supabase", "gcloud"],
    color: COLORS.green,
    icon: "💻",
  },
];

export const FourLayers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [315, 345], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
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
          The Architecture
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          Four Layers. One System.
        </div>
      </div>

      {/* Layer Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          marginTop: 80,
          padding: "0 50px",
        }}
      >
        {LAYERS.map((layer, i) => {
          const delay = 40 + i * 35;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 180, mass: 0.6 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 25], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                background: `linear-gradient(180deg, ${COLORS.bgCard} 0%, ${COLORS.bgRaised} 100%)`,
                border: `1px solid ${COLORS.border}`,
                borderTop: `4px solid ${layer.color}`,
                borderRadius: 16,
                padding: "28px 22px",
                opacity: cardOpacity,
                transform: `scale(${Math.min(cardScale, 1)})`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 40px ${layer.color}15`,
              }}
            >
              {/* Icon + Label + Count */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{layer.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      color: layer.color,
                      letterSpacing: 2,
                      textShadow: `0 0 10px ${layer.color}40`,
                    }}
                  >
                    {layer.label}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 42,
                      fontWeight: 700,
                      color: COLORS.textBright,
                      lineHeight: 1,
                      textShadow: `0 0 20px ${layer.color}40`,
                    }}
                  >
                    {layer.count}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 14,
                  color: COLORS.textMuted,
                  lineHeight: 1.5,
                  marginBottom: 16,
                  minHeight: 60,
                }}
              >
                {layer.description}
              </div>

              {/* Examples */}
              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
                {layer.examples.slice(0, 5).map((example, j) => {
                  const exampleDelay = delay + 50 + j * 8;
                  const exampleOpacity = interpolate(frame, [exampleDelay, exampleDelay + 15], [0, 1], {
                    extrapolateLeft: "clamp", extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={j}
                      style={{
                        fontFamily: FONT.mono,
                        fontSize: 13,
                        color: COLORS.textMuted,
                        opacity: exampleOpacity,
                        padding: "4px 0",
                      }}
                    >
                      {example}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          fontFamily: FONT.mono,
          fontSize: 22,
          color: COLORS.accentBright,
          letterSpacing: 3,
          textTransform: "uppercase",
          textShadow: `0 0 20px ${COLORS.accent}50`,
          opacity: interpolate(frame, [200, 230], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        Skills teach. Plugins bundle. MCPs power. CLIs authenticate.
      </div>
    </AbsoluteFill>
  );
};
