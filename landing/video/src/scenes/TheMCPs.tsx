import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const MCPS = [
  {
    name: "Context7",
    description: "Live documentation for any library",
    icon: "📖",
    color: "#3b82f6",
  },
  {
    name: "Playwright",
    description: "Browser automation and E2E tests",
    icon: "🎭",
    color: "#2ecc40",
  },
  {
    name: "Memory",
    description: "Persists knowledge across sessions",
    icon: "🧠",
    color: "#8b5cf6",
  },
  {
    name: "Remotion",
    description: "Generates videos programmatically",
    icon: "🎬",
    color: "#f59e0b",
  },
];

export const TheMCPs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Bottom tagline
  const taglineOpacity = interpolate(frame, [320, 350], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
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
          18 MCP Integrations
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          MCPs That Actually Work
        </div>
      </div>

      {/* 2x2 MCP Grid */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          bottom: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 420px)",
            gap: 32,
          }}
        >
          {MCPS.map((mcp, i) => {
            const delay = 50 + i * 50;
            const cardScale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 180, mass: 0.4 },
            });

            const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            const descOpacity = interpolate(frame, [delay + 30, delay + 50], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${Math.min(cardScale, 1)})`,
                  background: COLORS.bgCard,
                  border: `1px solid ${mcp.color}50`,
                  borderRadius: 16,
                  padding: "28px 32px",
                  boxShadow: `0 4px 30px rgba(0,0,0,0.3), 0 0 40px ${mcp.color}15`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 40,
                      filter: `drop-shadow(0 0 10px ${mcp.color}60)`,
                    }}
                  >
                    {mcp.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 28,
                      fontWeight: 700,
                      color: COLORS.textBright,
                    }}
                  >
                    {mcp.name}
                  </div>
                </div>

                <div
                  style={{
                    opacity: descOpacity,
                    fontFamily: FONT.sans,
                    fontSize: 20,
                    color: COLORS.textMuted,
                    lineHeight: 1.4,
                  }}
                >
                  {mcp.description}
                </div>

                {/* Colored accent line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 32,
                    right: 32,
                    height: 3,
                    background: `linear-gradient(90deg, ${mcp.color}, ${mcp.color}40)`,
                    borderRadius: "0 0 8px 8px",
                    opacity: cardOpacity,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: taglineOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 32,
            color: COLORS.textBright,
          }}
        >
          <span style={{ color: COLORS.accentBright, fontWeight: 700 }}>18</span>{" "}
          integrations.{" "}
          <span style={{ color: COLORS.green, fontWeight: 700 }}>Zero</span>{" "}
          configuration.
        </div>
      </div>
    </AbsoluteFill>
  );
};
