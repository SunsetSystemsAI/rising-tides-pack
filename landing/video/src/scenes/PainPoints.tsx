import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONT } from "../theme";

const PAINS = [
  { text: "Building skills from scratch.", accent: "from scratch" },
  { text: "MCPs that break every update.", accent: "break" },
  { text: "40% of your context — gone.", accent: "40%" },
  { text: "Sound familiar?", accent: "familiar" },
];

export const PainPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const painCycle = 85; // ~2.8s per pain point for 12s total

  return (
    <AbsoluteFill>
      {PAINS.map((pain, i) => {
        const start = i * painCycle;
        const localFrame = frame - start;
        if (localFrame < 0 || localFrame > painCycle + 10) return null;

        // Fade in, hold, fade out
        const opacity = interpolate(
          localFrame,
          [0, 15, 65, 80],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Slight scale animation on entrance
        const scale = interpolate(
          localFrame,
          [0, 15, 20],
          [1.05, 1, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const parts = pain.text.split(pain.accent);
        const isLast = i === PAINS.length - 1;

        return (
          <AbsoluteFill
            key={i}
            style={{
              justifyContent: "center",
              alignItems: "center",
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {/* Red stress lines — top and bottom (not for "Sound familiar?") */}
            {!isLast && (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, transparent, ${COLORS.red}cc, transparent)`,
                    boxShadow: `0 0 30px 5px ${COLORS.red}40`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, transparent, ${COLORS.red}cc, transparent)`,
                    boxShadow: `0 0 30px 5px ${COLORS.red}40`,
                  }}
                />
              </>
            )}

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: isLast ? 64 : 56,
                fontWeight: 700,
                color: isLast ? COLORS.textMuted : COLORS.textMuted,
                textAlign: "center",
                maxWidth: 1000,
                lineHeight: 1.3,
              }}
            >
              {parts[0]}
              <span
                style={{
                  color: isLast ? COLORS.accentBright : COLORS.red,
                  textShadow: isLast
                    ? `0 0 40px ${COLORS.accent}80, 0 0 80px ${COLORS.accent}30`
                    : `0 0 40px ${COLORS.red}80, 0 0 80px ${COLORS.red}30`,
                }}
              >
                {pain.accent}
              </span>
              {parts[1]}
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
