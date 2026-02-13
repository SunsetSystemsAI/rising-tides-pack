import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { COLORS } from "./theme";
import { SunraysBackground } from "./scenes/SunraysBackground";
import { PainPoints } from "./scenes/PainPoints";
import { LogoReveal } from "./scenes/LogoReveal";
import { WhatYouGet } from "./scenes/WhatYouGet";
import { TheCLIs } from "./scenes/TheCLIs";
import { TheMCPs } from "./scenes/TheMCPs";
import { HowItWorks } from "./scenes/HowItWorks";
import { OneCommandInstall } from "./scenes/OneCommandInstall";
import { CallToAction } from "./scenes/CallToAction";

/**
 * Rising Tides Promo Video v3 - 95 seconds (2850 frames at 30fps)
 *
 * Timeline:
 * 0-12s     (0-360)      Pain Points - The problems we solve
 * 12-20s    (360-600)    Logo Reveal - Brand introduction
 * 20-35s    (600-1050)   What You Get - Installation tree
 * 35-50s    (1050-1500)  The CLIs - 9 CLI cards
 * 50-65s    (1500-1950)  The MCPs - MCP capabilities
 * 65-75s    (1950-2250)  How It Works - Auto-discovery flow
 * 75-85s    (2250-2550)  One Command Install - Easy setup
 * 85-95s    (2550-2850)  Call to Action - CTA + close
 */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Voiceover audio */}
      <Audio src={staticFile("voiceover-v3.mp3")} />

      {/* Persistent sun rays behind everything */}
      <SunraysBackground />

      {/* Scene 1: Pain Points (0s - 12s) */}
      <Sequence from={0} durationInFrames={360}>
        <PainPoints />
      </Sequence>

      {/* Scene 2: Logo Reveal (12s - 20s) */}
      <Sequence from={360} durationInFrames={240}>
        <LogoReveal />
      </Sequence>

      {/* Scene 3: What You Get - Installation tree (20s - 35s) */}
      <Sequence from={600} durationInFrames={450}>
        <WhatYouGet />
      </Sequence>

      {/* Scene 4: The CLIs - 9 CLI cards (35s - 50s) */}
      <Sequence from={1050} durationInFrames={450}>
        <TheCLIs />
      </Sequence>

      {/* Scene 5: The MCPs - MCP capabilities (50s - 65s) */}
      <Sequence from={1500} durationInFrames={450}>
        <TheMCPs />
      </Sequence>

      {/* Scene 6: How It Works - Auto-discovery (65s - 75s) */}
      <Sequence from={1950} durationInFrames={300}>
        <HowItWorks />
      </Sequence>

      {/* Scene 7: One Command Install (75s - 85s) */}
      <Sequence from={2250} durationInFrames={300}>
        <OneCommandInstall />
      </Sequence>

      {/* Scene 8: Call to Action (85s - 95s) */}
      <Sequence from={2550} durationInFrames={300}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
