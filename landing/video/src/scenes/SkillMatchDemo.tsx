import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const SESSION_1 = [
  { type: "prompt" as const, text: "> Help me set up Stripe payments for my SaaS", delay: 0 },
  { type: "match" as const, text: "  ⚡ Auto-matched: stripe-integration", delay: 45 },
  { type: "detail" as const, text: "  → CLI auth: stripe login", delay: 70 },
  { type: "detail" as const, text: "  → Products, checkout, webhooks configured", delay: 90 },
  { type: "success" as const, text: "  ✓ Payments live in 4 commands", delay: 115 },
];

const SESSION_2 = [
  { type: "prompt" as const, text: "> Build a dashboard with React and shadcn", delay: 155 },
  { type: "match" as const, text: "  ⚡ Auto-matched: react-dev + frontend-design", delay: 195 },
  { type: "detail" as const, text: "  → Fetching React 19 docs via Context7 MCP", delay: 218 },
  { type: "success" as const, text: "  ✓ Components, hooks, types — all current", delay: 245 },
];

const ALL_LINES = [...SESSION_1, ...SESSION_2];

export const SkillMatchDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const termY = interpolate(frame, [0, 25], [60, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const termOpacity = interpolate(frame, [0, 20, 285, 315], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: termOpacity,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 75,
          fontFamily: FONT.sans,
          fontSize: 24,
          color: COLORS.textMuted,
          opacity: interpolate(frame, [8, 25], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          letterSpacing: 3,
          textTransform: "uppercase",
          textShadow: `0 0 20px ${COLORS.purple}30`,
        }}
      >
        You describe the task. Claude picks the skill.
      </div>

      <div
        style={{
          width: 1050,
          transform: `translateY(${termY}px)`,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${COLORS.borderLight}`,
          boxShadow: `
            0 25px 100px rgba(0,0,0,0.8),
            0 0 100px ${COLORS.purple}20,
            0 0 60px ${COLORS.accent}15,
            inset 0 1px 0 ${COLORS.borderLight}40
          `,
        }}
      >
        {/* Terminal chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 18px",
            background: COLORS.bgRaised,
            borderBottom: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: COLORS.red, boxShadow: `0 0 6px ${COLORS.red}60` }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: COLORS.accent, boxShadow: `0 0 6px ${COLORS.accent}60` }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: COLORS.green, boxShadow: `0 0 6px ${COLORS.green}60` }} />
          <span style={{ fontFamily: FONT.mono, fontSize: 14, color: COLORS.textMuted, marginLeft: 12 }}>
            claude — ~/my-saas-project
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: "28px 30px",
            background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgRaised}80 100%)`,
            fontFamily: FONT.mono,
            fontSize: 22,
            lineHeight: 2.1,
            minHeight: 440,
          }}
        >
          {ALL_LINES.map((line, i) => {
            const lineOpacity = interpolate(
              frame, [line.delay, line.delay + 15], [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const lineX = interpolate(
              frame, [line.delay, line.delay + 15],
              [line.type === "prompt" ? 0 : 12, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            if (i === SESSION_1.length) {
              return (
                <div key={`gap-${i}`} style={{
                  height: 20,
                  opacity: interpolate(frame, [140, 150], [0, 1], {
                    extrapolateLeft: "clamp", extrapolateRight: "clamp",
                  }),
                }}>
                  <div style={{
                    height: 1,
                    background: `linear-gradient(90deg, transparent, ${COLORS.borderLight}, transparent)`,
                    marginTop: 10,
                  }} />
                </div>
              );
            }

            let content: React.ReactNode = line.text;

            if (line.type === "prompt") {
              content = (
                <>
                  <span style={{ color: COLORS.accentBright, textShadow: `0 0 8px ${COLORS.accent}60` }}>&gt; </span>
                  <span style={{ color: COLORS.textBright }}>{line.text.substring(2)}</span>
                </>
              );
            } else if (line.type === "match") {
              const skillName = line.text.split(": ")[1];
              content = (
                <>
                  <span style={{ color: COLORS.accentBright }}>  ⚡ Auto-matched: </span>
                  <span
                    style={{
                      color: COLORS.accentWarm,
                      textShadow: `0 0 15px ${COLORS.accentWarm}80, 0 0 30px ${COLORS.accent}40`,
                      fontWeight: 700,
                    }}
                  >
                    {skillName}
                  </span>
                </>
              );
            } else if (line.type === "success") {
              content = (
                <span style={{
                  color: COLORS.green,
                  textShadow: `0 0 12px ${COLORS.green}50, 0 0 25px ${COLORS.green}20`,
                }}>
                  {line.text}
                </span>
              );
            } else {
              content = <span style={{ color: COLORS.textMuted }}>{line.text}</span>;
            }

            return (
              <div key={i} style={{ opacity: lineOpacity, transform: `translateX(${lineX}px)` }}>
                {content}
              </div>
            );
          })}

          {frame > 260 && (
            <div style={{ marginTop: 4 }}>
              <span style={{ color: COLORS.accentBright, textShadow: `0 0 8px ${COLORS.accent}60` }}>&gt; </span>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 24,
                  background: COLORS.accentBright,
                  verticalAlign: "text-bottom",
                  opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0,
                  boxShadow: `0 0 12px ${COLORS.accent}90, 0 0 25px ${COLORS.accent}40`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
