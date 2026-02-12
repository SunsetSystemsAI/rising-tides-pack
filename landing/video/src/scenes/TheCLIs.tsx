import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const CLIS = [
  { name: "GitHub", cmd: "gh", color: "#6e5494" },
  { name: "Stripe", cmd: "stripe", color: "#635bff" },
  { name: "Vercel", cmd: "vercel", color: "#ffffff" },
  { name: "Netlify", cmd: "netlify", color: "#00c7b7" },
  { name: "Firebase", cmd: "firebase", color: "#ffca28" },
  { name: "Supabase", cmd: "supabase", color: "#3ecf8e" },
  { name: "Google Cloud", cmd: "gcloud", color: "#4285f4" },
  { name: "Jira", cmd: "jira", color: "#0052cc" },
  { name: "Datadog", cmd: "datadog", color: "#632ca6" },
];

const CAPABILITIES = [
  "Deploy",
  "Accept payments",
  "Push code",
  "Monitor errors",
];

export const TheCLIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [400, 450], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // "All from Claude" text
  const allFromOpacity = interpolate(frame, [340, 360], [0, 1], {
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
          9 CLI Integrations
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.textBright,
          }}
        >
          The CLIs You Actually Need
        </div>
      </div>

      {/* 3x3 CLI Grid */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 280px)",
            gap: 24,
          }}
        >
          {CLIS.map((cli, i) => {
            const delay = 40 + i * 25;
            const cardScale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 200, mass: 0.4 },
            });

            const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: "clamp", extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${Math.min(cardScale, 1)})`,
                  background: COLORS.bgCard,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 12,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Color indicator */}
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: cli.color,
                    boxShadow: `0 0 10px ${cli.color}80`,
                  }}
                />

                <div>
                  <div
                    style={{
                      fontFamily: FONT.sans,
                      fontSize: 22,
                      fontWeight: 600,
                      color: COLORS.textBright,
                    }}
                  >
                    {cli.name}
                  </div>
                  <div
                    style={{
                      fontFamily: FONT.mono,
                      fontSize: 14,
                      color: COLORS.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {cli.cmd}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capabilities row */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {CAPABILITIES.map((cap, i) => {
          const delay = 280 + i * 12;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                fontFamily: FONT.mono,
                fontSize: 20,
                color: COLORS.purpleBright,
                padding: "8px 16px",
                background: COLORS.bgRaised,
                borderRadius: 6,
                border: `1px solid ${COLORS.purple}40`,
              }}
            >
              {cap}
            </div>
          );
        })}
      </div>

      {/* "All from Claude" */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: allFromOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: 28,
            color: COLORS.textMuted,
          }}
        >
          All from{" "}
          <span style={{ color: COLORS.accentBright, fontWeight: 600 }}>
            Claude
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
