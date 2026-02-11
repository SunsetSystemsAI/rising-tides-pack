import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./theme";
import { SunraysBackground } from "./scenes/SunraysBackground";
import { PainPoints } from "./scenes/PainPoints";
import { LogoReveal } from "./scenes/LogoReveal";
import { WhatItIs } from "./scenes/WhatItIs";
import { FourLayers } from "./scenes/FourLayers";
import { HowItWorks } from "./scenes/HowItWorks";
import { SkillMatchDemo } from "./scenes/SkillMatchDemo";
import { ContextEfficiency } from "./scenes/ContextEfficiency";
import { OneCommandInstall } from "./scenes/OneCommandInstall";
import { CallToAction } from "./scenes/CallToAction";

/**
 * Rising Tides Promo Video - 75 seconds (2250 frames at 30fps)
 *
 * Timeline:
 * 0-8s     (0-240)     Pain Points - The problems we solve
 * 7.5-13s  (225-390)   Logo Reveal - Brand introduction
 * 12.5-22s (375-660)   What It Is - The product overview
 * 21.5-33s (645-990)   Four Layers - Architecture explained
 * 32.5-42s (975-1260)  How It Works - Auto-discovery
 * 41.5-54s (1245-1620) Skill Match Demo - Terminal demo
 * 53.5-62s (1605-1860) Context Efficiency - The magic stats
 * 61.5-68s (1845-2040) One Command Install - Easy setup
 * 67.5-75s (2025-2250) Call to Action - CTA + close
 */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Persistent sun rays behind everything */}
      <SunraysBackground />

      {/* Scene 1: The Pain — 3 frustrations (0s - 8s) */}
      <Sequence from={0} durationInFrames={240}>
        <PainPoints />
      </Sequence>

      {/* Scene 2: Logo reveal (7.5s - 13s) */}
      <Sequence from={225} durationInFrames={165}>
        <LogoReveal />
      </Sequence>

      {/* Scene 3: What It Is — Product overview (12.5s - 22s) */}
      <Sequence from={375} durationInFrames={285}>
        <WhatItIs />
      </Sequence>

      {/* Scene 4: Four Layers — Architecture (21.5s - 33s) */}
      <Sequence from={645} durationInFrames={345}>
        <FourLayers />
      </Sequence>

      {/* Scene 5: How It Works — Auto-discovery (32.5s - 42s) */}
      <Sequence from={975} durationInFrames={285}>
        <HowItWorks />
      </Sequence>

      {/* Scene 6: Skill Match Demo — Terminal (41.5s - 54s) */}
      <Sequence from={1245} durationInFrames={375}>
        <SkillMatchDemo />
      </Sequence>

      {/* Scene 7: Context Efficiency — Stats (53.5s - 62s) */}
      <Sequence from={1605} durationInFrames={255}>
        <ContextEfficiency />
      </Sequence>

      {/* Scene 8: One Command Install (61.5s - 68s) */}
      <Sequence from={1845} durationInFrames={195}>
        <OneCommandInstall />
      </Sequence>

      {/* Scene 9: CTA + close (67.5s - 75s) */}
      <Sequence from={2025} durationInFrames={225}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
