import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS, FONT } from "../theme";

const PAINS = [
  { text: "Another broken MCP config.", accent: "broken" },
  { text: "40% of your context — gone.", accent: "40%" },
  { text: "3 hours setting up skills.", accent: "3 hours" },
];

export const PainPoints: React.FC = () => {
  const frame = useCurrentFrame();
  const painCycle = 65;

  return (
    <AbsoluteFill>
      {PAINS.map((pain, i) => {
        const start = i * painCycle;
        const localFrame = frame - start;
        if (localFrame < 0 || localFrame > painCycle) return null;

        const opacity = interpolate(
          localFrame,
          [0, 10, 50, 62],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const scale = interpolate(
          localFrame,
          [0, 10, 15],
          [1.04, 1, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const parts = pain.text.split(pain.accent);

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
            {/* Red stress lines — top and bottom */}
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
                fontFamily: FONT.mono,
                fontSize: 58,
                fontWeight: 700,
                color: COLORS.textMuted,
                textAlign: "center",
                maxWidth: 900,
                lineHeight: 1.3,
              }}
            >
              {parts[0]}
              <span
                style={{
                  color: COLORS.red,
                  textShadow: `0 0 40px ${COLORS.red}80, 0 0 80px ${COLORS.red}30`,
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
