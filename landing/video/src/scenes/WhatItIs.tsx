import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../theme";

const STATS = [
  { number: "187", label: "Production-Ready Skills", color: COLORS.accentBright },
  { number: "38", label: "Pre-Configured Plugins", color: COLORS.purpleBright },
  { number: "18", label: "MCP Integrations", color: COLORS.accentWarm },
  { number: "9", label: "CLI Tools Documented", color: COLORS.green },
];

export const WhatItIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [255, 285], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 100,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 18,
            color: COLORS.accentBright,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
            textShadow: `0 0 20px ${COLORS.accent}50`,
          }}
        >
          Introducing
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.textBright,
            textShadow: `0 0 40px ${COLORS.accentBright}40`,
          }}
        >
          Rising Tides Skills Pack
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 260,
          fontFamily: FONT.sans,
          fontSize: 28,
          color: COLORS.textMuted,
          opacity: subtitleOpacity,
          maxWidth: 800,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        A curated library of skills, plugins, and integrations for Claude Code.
        Everything you need to ship faster — nothing you don't.
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 40,
          marginTop: 120,
          padding: "0 60px",
        }}
      >
        {STATS.map((stat, i) => {
          const delay = 60 + i * 25;
          const statScale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, stiffness: 200, mass: 0.5 },
          });
          const statOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                opacity: statOpacity,
                transform: `scale(${Math.min(statScale, 1)})`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT.mono,
                  fontSize: 80,
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1,
                  textShadow: `0 0 30px ${stat.color}60, 0 0 60px ${stat.color}30`,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: FONT.sans,
                  fontSize: 18,
                  color: COLORS.textMuted,
                  marginTop: 12,
                  letterSpacing: 1,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
