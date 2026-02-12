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

const FEATURES = [
  { text: "Installs prerequisites", icon: "⚙️" },
  { text: "Installs Claude Code", icon: "🤖" },
  { text: "Configures everything", icon: "✨" },
  { text: "Skips what's installed", icon: "⏭️" },
];

export const OneCommandInstall: React.FC = () => {
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

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 70,
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
            fontSize: 52,
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
          gap: 32,
          marginTop: 40,
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
                width: 420,
                background: COLORS.bgCard,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "24px 28px",
                opacity: cardOpacity,
                transform: `scale(${Math.min(cardScale, 1)})`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.4)`,
              }}
            >
              {/* Platform header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <span style={{ fontSize: 32 }}>{platform.icon}</span>
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
                  fontSize: 14,
                  color: COLORS.accentBright,
                  background: COLORS.bg,
                  padding: "12px 16px",
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

      {/* Features row */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          display: "flex",
          gap: 40,
        }}
      >
        {FEATURES.map((feature, i) => {
          const delay = 120 + i * 20;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                fontFamily: FONT.sans,
                fontSize: 18,
                color: COLORS.green,
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: COLORS.bgRaised,
                padding: "10px 16px",
                borderRadius: 8,
                border: `1px solid ${COLORS.green}30`,
              }}
            >
              <span style={{ fontSize: 18 }}>{feature.icon}</span>
              {feature.text}
            </div>
          );
        })}
      </div>

      {/* "Done" text */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          textAlign: "center",
          opacity: interpolate(frame, [220, 245], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.accentBright,
            textShadow: `0 0 30px ${COLORS.accent}60`,
          }}
        >
          Done.
        </div>
      </div>
    </AbsoluteFill>
  );
};
