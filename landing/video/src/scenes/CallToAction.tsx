import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const line2Opacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [30, 55], [25, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const btnScale = spring({
    frame: frame - 65,
    fps,
    config: { damping: 10, mass: 0.7 },
  });

  const glowSize = interpolate(frame, [75, 110, 145, 180, 225], [40, 70, 40, 65, 55]);
  const glowOpacity = interpolate(frame, [75, 110, 145, 180, 225], [0.5, 0.9, 0.5, 0.8, 0.6]);

  const communityOpacity = interpolate(frame, [100, 125], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [130, 155], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 1100 }}>
        {/* Main headline */}
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.textBright,
            opacity: line1Opacity,
            lineHeight: 1.15,
            textShadow: `0 0 40px rgba(255,255,255,0.15)`,
          }}
        >
          Stop building skills.
        </div>

        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.accentBright,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            lineHeight: 1.15,
            textShadow: `0 0 40px ${COLORS.accentBright}80, 0 0 80px ${COLORS.accent}50, 0 0 120px ${COLORS.accent}25`,
          }}
        >
          Start shipping code.
        </div>

        {/* Stats line */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 28,
            color: COLORS.textMuted,
            opacity: line2Opacity,
            marginTop: 32,
            marginBottom: 50,
            letterSpacing: 1,
          }}
        >
          180 skills · 37 plugins · 17 MCPs · One command
        </div>

        {/* CTA Button */}
        <div
          style={{
            display: "inline-block",
            transform: `scale(${Math.max(0, Math.min(btnScale, 1))})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 28,
              fontWeight: 700,
              color: COLORS.bg,
              background: `linear-gradient(135deg, ${COLORS.accentBright}, ${COLORS.accentWarm})`,
              padding: "26px 80px",
              borderRadius: 14,
              boxShadow: `
                0 0 ${glowSize}px ${glowSize * 0.5}px rgba(252, 211, 77, ${glowOpacity}),
                0 0 ${glowSize * 2}px ${glowSize}px rgba(245, 158, 11, ${glowOpacity * 0.35})
              `,
            }}
          >
            Get Rising Tides →
          </div>
        </div>

        {/* Community link */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 22,
            color: COLORS.purpleBright,
            opacity: communityOpacity,
            marginTop: 36,
            textShadow: `0 0 15px ${COLORS.purple}40`,
          }}
        >
          Join the community → skool.com/rising-tides
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            color: COLORS.textMuted,
            opacity: taglineOpacity,
            marginTop: 50,
            fontStyle: "italic",
            letterSpacing: 3,
          }}
        >
          A rising tide lifts all boats.
        </div>
      </div>
    </AbsoluteFill>
  );
};
