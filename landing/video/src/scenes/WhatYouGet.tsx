import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const INSTALL_ITEMS = [
  {
    label: "Prerequisites",
    sub: "Node.js • Git • Python",
    delay: 60,
    icon: "⚙️",
  },
  {
    label: "Claude Code",
    sub: "Installed or updated automatically",
    delay: 120,
    icon: "🤖",
  },
  {
    label: "187 Skills",
    sub: "Production-ready, indexed",
    delay: 200,
    icon: "📚",
    highlight: true,
  },
  {
    label: "38 Plugins",
    sub: "Pre-configured bundles",
    delay: 260,
    icon: "🔌",
    highlight: true,
  },
  {
    label: "18 MCPs",
    sub: "Integration layers",
    delay: 320,
    icon: "🔗",
    highlight: true,
  },
  {
    label: "9 CLIs",
    sub: "Ready to use",
    delay: 380,
    icon: "⌨️",
    highlight: true,
  },
];

export const WhatYouGet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [550, 600], [1, 0], {
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
          One Command
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 52,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          Everything You Need
        </div>
      </div>

      {/* Installation tree */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          bottom: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: 800,
          }}
        >
          {INSTALL_ITEMS.map((item, i) => {
            const itemScale = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 12, stiffness: 200, mass: 0.4 },
            });

            const itemOpacity = interpolate(frame, [item.delay, item.delay + 20], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            const checkOpacity = interpolate(frame, [item.delay + 30, item.delay + 45], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            const checkScale = spring({
              frame: frame - item.delay - 30,
              fps,
              config: { damping: 8, stiffness: 300, mass: 0.3 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: itemOpacity,
                  transform: `scale(${Math.min(itemScale, 1)})`,
                  transformOrigin: "left center",
                }}
              >
                {/* Connection line */}
                <div
                  style={{
                    width: 30,
                    height: 2,
                    background: `linear-gradient(90deg, ${COLORS.accent}40, ${COLORS.accent})`,
                  }}
                />

                {/* Item card */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: item.highlight ? COLORS.bgCard : COLORS.bgRaised,
                    border: `1px solid ${item.highlight ? COLORS.accent + "60" : COLORS.border}`,
                    borderRadius: 12,
                    padding: "18px 24px",
                    boxShadow: item.highlight
                      ? `0 0 30px ${COLORS.accent}20, inset 0 0 20px ${COLORS.accent}10`
                      : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ fontSize: 28 }}>{item.icon}</div>
                    <div>
                      <div
                        style={{
                          fontFamily: FONT.mono,
                          fontSize: item.highlight ? 28 : 24,
                          fontWeight: 600,
                          color: item.highlight ? COLORS.accentBright : COLORS.textBright,
                          textShadow: item.highlight ? `0 0 15px ${COLORS.accent}50` : "none",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: FONT.sans,
                          fontSize: 16,
                          color: COLORS.textMuted,
                          marginTop: 4,
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  {/* Checkmark */}
                  <div
                    style={{
                      opacity: checkOpacity,
                      transform: `scale(${Math.min(checkScale, 1)})`,
                      color: COLORS.green,
                      fontSize: 32,
                      fontWeight: 700,
                      textShadow: `0 0 20px ${COLORS.green}80`,
                    }}
                  >
                    ✓
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom summary */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [450, 480], [0, 1], {
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
          All configured.{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 600 }}>
            Ready to use.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
