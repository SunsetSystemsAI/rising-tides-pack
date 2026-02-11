import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const PLATFORMS = [
  {
    name: "Mac",
    icon: "🍎",
    command: "curl -fsSL bit.ly/rising-tides-mac | bash",
  },
  {
    name: "Linux",
    icon: "🐧",
    command: "curl -fsSL bit.ly/rising-tides-linux | bash",
  },
  {
    name: "Windows",
    icon: "🪟",
    command: "irm bit.ly/rising-tides-win | iex",
  },
];

export const OneCommandInstall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [165, 195], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 120,
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
          Get Started
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 56,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          One Command. Any Platform.
        </div>
      </div>

      {/* Platform cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          marginTop: 80,
        }}
      >
        {PLATFORMS.map((platform, i) => {
          const delay = 35 + i * 25;
          const cardScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 180, mass: 0.5 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                width: 480,
                background: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "28px 32px",
                opacity: cardOpacity,
                transform: `scale(${Math.min(cardScale, 1)})`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.4)`,
              }}
            >
              {/* Platform header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <span style={{ fontSize: 36 }}>{platform.icon}</span>
                <div
                  style={{
                    fontFamily: FONT.mono,
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.textBright,
                  }}
                >
                  {platform.name}
                </div>
              </div>

              {/* Command */}
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 16,
                  color: COLORS.accentBright,
                  background: COLORS.bg,
                  padding: "14px 18px",
                  borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                  wordBreak: "break-all",
                  textShadow: `0 0 8px ${COLORS.accent}40`,
                }}
              >
                $ {platform.command}
              </div>
            </div>
          );
        })}
      </div>

      {/* Features list */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 50,
          opacity: interpolate(frame, [100, 130], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          "Prerequisites auto-detected",
          "Claude Code installed",
          "Skills configured",
        ].map((text, i) => (
          <div
            key={i}
            style={{
              fontFamily: FONT.sans,
              fontSize: 18,
              color: COLORS.green,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 20 }}>✓</span>
            {text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
