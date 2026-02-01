import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { COLORS, FONT } from "../theme";

const STATS = [
  { number: "80", label: "Production-Ready Skills", sub: null },
  { number: "3%", label: "Context Cost", sub: "Not 40%. Three percent." },
  { number: "1", label: "Command to Install", sub: null },
];

export const StatsFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const statDuration = 40;

  return (
    <AbsoluteFill>
      {STATS.map((stat, i) => {
        const start = i * statDuration;
        const localFrame = frame - start;
        if (localFrame < 0 || localFrame > statDuration + 8) return null;

        const opacity = interpolate(
          localFrame, [0, 8, statDuration - 8, statDuration], [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const numScale = spring({
          frame: localFrame, fps,
          config: { damping: 8, stiffness: 250, mass: 0.4 },
        });

        const isHero = stat.number === "3%";

        return (
          <AbsoluteFill
            key={i}
            style={{ justifyContent: "center", alignItems: "center", opacity }}
          >
            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: isHero ? 200 : 150,
                fontWeight: 700,
                color: isHero ? COLORS.accentBright : COLORS.textBright,
                transform: `scale(${Math.min(numScale, 1)})`,
                textShadow: isHero
                  ? `0 0 40px ${COLORS.accentBright}, 0 0 80px ${COLORS.accent}cc, 0 0 150px ${COLORS.accent}50`
                  : `0 0 30px ${COLORS.accentBright}60, 0 0 60px ${COLORS.accent}30`,
                lineHeight: 1,
              }}
            >
              {stat.number}
            </div>

            <div
              style={{
                fontFamily: FONT.mono,
                fontSize: 26,
                color: COLORS.textMuted,
                textTransform: "uppercase",
                letterSpacing: 6,
                marginTop: 22,
              }}
            >
              {stat.label}
            </div>

            {stat.sub && (
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 22,
                  color: COLORS.accentWarm,
                  marginTop: 14,
                  textShadow: `0 0 15px ${COLORS.accentWarm}50`,
                  opacity: interpolate(localFrame, [12, 22], [0, 1], {
                    extrapolateLeft: "clamp", extrapolateRight: "clamp",
                  }),
                }}
              >
                {stat.sub}
              </div>
            )}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
