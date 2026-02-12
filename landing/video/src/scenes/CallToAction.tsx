import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Stop building skills from scratch"
  const line1Opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "Start shipping code"
  const line2Opacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [35, 60], [20, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "Rising Tides Starter Pack" brand
  const brandScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 10, mass: 0.7 },
  });
  const brandOpacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Glow animation for CTA
  const glowSize = interpolate(frame, [100, 140, 180, 220, 260], [40, 70, 45, 65, 50]);
  const glowOpacity = interpolate(frame, [100, 140, 180, 220, 260], [0.5, 0.9, 0.55, 0.8, 0.6]);

  // "One command. Everything you need."
  const subtitleOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Tagline
  const taglineOpacity = interpolate(frame, [180, 205], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Stats line
  const statsOpacity = interpolate(frame, [210, 235], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 1200 }}>
        {/* Main headline */}
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.textBright,
            opacity: line1Opacity,
            lineHeight: 1.15,
            textShadow: `0 0 40px rgba(255,255,255,0.15)`,
          }}
        >
          Stop building skills from scratch.
        </div>

        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.accentBright,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            lineHeight: 1.15,
            marginTop: 8,
            textShadow: `
              0 0 40px ${COLORS.accentBright}80,
              0 0 80px ${COLORS.accent}50,
              0 0 120px ${COLORS.accent}25
            `,
          }}
        >
          Start shipping code.
        </div>

        {/* Brand name with glow */}
        <div
          style={{
            marginTop: 50,
            marginBottom: 16,
            display: "inline-block",
            opacity: brandOpacity,
            transform: `scale(${Math.max(0, Math.min(brandScale, 1))})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.textBright,
              background: `linear-gradient(135deg, ${COLORS.accentBright}, ${COLORS.accentWarm})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              padding: "20px 60px",
              borderRadius: 12,
              border: `2px solid ${COLORS.accent}60`,
              boxShadow: `
                0 0 ${glowSize}px ${glowSize * 0.4}px rgba(252, 211, 77, ${glowOpacity}),
                0 0 ${glowSize * 1.5}px ${glowSize * 0.7}px rgba(245, 158, 11, ${glowOpacity * 0.3})
              `,
            }}
          >
            Rising Tides Starter Pack
          </div>
        </div>

        {/* "One command. Everything you need." */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 28,
            color: COLORS.textMuted,
            opacity: subtitleOpacity,
            marginTop: 24,
          }}
        >
          One command.{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 600 }}>
            Everything you need.
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            color: COLORS.purpleBright,
            opacity: taglineOpacity,
            marginTop: 40,
            fontStyle: "italic",
            letterSpacing: 2,
            textShadow: `0 0 15px ${COLORS.purple}40`,
          }}
        >
          A rising tide lifts all boats.
        </div>

        {/* Stats line */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            color: COLORS.textMuted,
            opacity: statsOpacity,
            marginTop: 30,
            letterSpacing: 1,
          }}
        >
          187 skills · 38 plugins · 18 MCPs · 9 CLIs
        </div>
      </div>
    </AbsoluteFill>
  );
};
