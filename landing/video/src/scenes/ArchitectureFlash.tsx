import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const COLUMNS = [
  {
    label: "SKILLS",
    count: "80",
    items: ["React Dev", "Stripe Payments", "SEO Audit", "Database Schema", "Copywriting", "Deployment", "..."],
    color: COLORS.accentBright,
  },
  {
    label: "PLUGINS",
    count: "12",
    items: ["Context7 Docs", "Playwright Tests", "Browser Control", "GitHub Flow", "Video Gen", "shadcn/ui", "..."],
    color: COLORS.purpleBright,
  },
  {
    label: "CLI INTEGRATIONS",
    count: "9",
    items: ["gh · stripe · vercel", "netlify · firebase", "supabase · gcloud", "jira · datadog"],
    color: COLORS.accentWarm,
  },
];

export const ArchitectureFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(
    frame, [0, 15, 135, 165], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: sceneOpacity }}>
      <div
        style={{
          position: "absolute",
          top: 95,
          fontFamily: FONT.mono,
          fontSize: 20,
          color: COLORS.accentBright,
          letterSpacing: 4,
          textTransform: "uppercase",
          textShadow: `0 0 20px ${COLORS.accent}50`,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
        }}
      >
        Everything you need. Nothing you don't.
      </div>

      <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
        {COLUMNS.map((col, i) => {
          const stagger = i * 15;
          const colScale = spring({
            frame: frame - stagger - 12, fps,
            config: { damping: 12, mass: 0.6 },
          });
          const colOpacity = interpolate(
            frame, [stagger + 12, stagger + 28], [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                width: 330,
                background: `linear-gradient(180deg, ${COLORS.bgCard} 0%, ${COLORS.bgRaised} 100%)`,
                border: `1px solid ${COLORS.border}`,
                borderTop: `4px solid ${col.color}`,
                borderRadius: 14,
                padding: "32px 28px",
                opacity: colOpacity,
                transform: `scale(${Math.min(colScale, 1)})`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.4), 0 0 30px ${col.color}10`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 14,
                  color: col.color,
                  letterSpacing: 3,
                  marginBottom: 10,
                  textShadow: `0 0 10px ${col.color}40`,
                }}
              >
                {col.label}
              </div>

              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 68,
                  fontWeight: 700,
                  color: COLORS.textBright,
                  lineHeight: 1,
                  marginBottom: 22,
                  textShadow: `0 0 30px ${col.color}50, 0 0 60px ${col.color}20`,
                }}
              >
                {col.count}
              </div>

              {col.items.map((item, j) => {
                const itemDelay = stagger + 30 + j * 5;
                const itemOpacity = interpolate(
                  frame, [itemDelay, itemDelay + 12], [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                return (
                  <div
                    key={j}
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 17,
                      color: COLORS.textMuted,
                      opacity: itemOpacity,
                      padding: "6px 0",
                      borderBottom: j < col.items.length - 1 ? `1px solid ${COLORS.border}` : "none",
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
