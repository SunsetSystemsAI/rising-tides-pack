import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const line2Opacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const line2Y = interpolate(frame, [25, 45], [20, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const btnScale = spring({
    frame: frame - 55, fps,
    config: { damping: 10, mass: 0.7 },
  });

  const glowSize = interpolate(frame, [65, 90, 115, 140, 165], [35, 60, 35, 60, 50]);
  const glowOpacity = interpolate(frame, [65, 90, 115, 140, 165], [0.4, 0.8, 0.4, 0.7, 0.5]);

  const communityOpacity = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 1000 }}>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.textBright,
            opacity: line1Opacity,
            lineHeight: 1.2,
            textShadow: `0 0 30px rgba(255,255,255,0.1)`,
          }}
        >
          Stop building skills.
        </div>

        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.accentBright,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            lineHeight: 1.2,
            textShadow: `0 0 30px ${COLORS.accentBright}80, 0 0 60px ${COLORS.accent}50, 0 0 100px ${COLORS.accent}25`,
          }}
        >
          Start shipping code.
        </div>

        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 26,
            color: COLORS.textMuted,
            opacity: line2Opacity,
            marginTop: 28,
            marginBottom: 44,
            letterSpacing: 1,
          }}
        >
          80 skills · 12 plugins · 9 CLIs · One command
        </div>

        <div
          style={{
            display: "inline-block",
            transform: `scale(${Math.max(0, Math.min(btnScale, 1))})`,
          }}
        >
          <div
            style={{
              fontFamily: FONT.mono,
              fontSize: 26,
              fontWeight: 700,
              color: COLORS.bg,
              background: `linear-gradient(135deg, ${COLORS.accentBright}, ${COLORS.accentWarm})`,
              padding: "24px 70px",
              borderRadius: 12,
              boxShadow: `
                0 0 ${glowSize}px ${glowSize * 0.5}px rgba(252, 211, 77, ${glowOpacity}),
                0 0 ${glowSize * 2}px ${glowSize}px rgba(245, 158, 11, ${glowOpacity * 0.3})
              `,
            }}
          >
            Get Rising Tides →
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 20,
            color: COLORS.purpleBright,
            opacity: communityOpacity,
            marginTop: 30,
            textShadow: `0 0 15px ${COLORS.purple}40`,
          }}
        >
          Join the community → skool.com/rising-tides
        </div>

        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 18,
            color: COLORS.textMuted,
            opacity: taglineOpacity,
            marginTop: 44,
            fontStyle: "italic",
            letterSpacing: 2,
          }}
        >
          A rising tide lifts all boats.
        </div>
      </div>
    </AbsoluteFill>
  );
};
