import { AbsoluteFill, Sequence } from "remotion";
import { COLORS } from "./theme";
import { SunraysBackground } from "./scenes/SunraysBackground";
import { PainPoints } from "./scenes/PainPoints";
import { LogoReveal } from "./scenes/LogoReveal";
import { SkillMatchDemo } from "./scenes/SkillMatchDemo";
import { ArchitectureFlash } from "./scenes/ArchitectureFlash";
import { StatsFlash } from "./scenes/StatsFlash";
import { CallToAction } from "./scenes/CallToAction";

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Persistent sun rays behind everything */}
      <SunraysBackground />

      {/* Beat 1: The pain — 3 frustrations (0s - 7s) */}
      <Sequence from={0} durationInFrames={210}>
        <PainPoints />
      </Sequence>

      {/* Beat 2: Logo reveal (6.5s - 12s) */}
      <Sequence from={195} durationInFrames={165}>
        <LogoReveal />
      </Sequence>

      {/* Beat 3: Skill matching demo (11.5s - 22s) */}
      <Sequence from={345} durationInFrames={315}>
        <SkillMatchDemo />
      </Sequence>

      {/* Beat 4: Architecture — what's included (21.5s - 27s) */}
      <Sequence from={645} durationInFrames={165}>
        <ArchitectureFlash />
      </Sequence>

      {/* Beat 5: Stats hammer (26.5s - 31s) */}
      <Sequence from={795} durationInFrames={135}>
        <StatsFlash />
      </Sequence>

      {/* Beat 6: CTA + close (30.5s - 36s) */}
      <Sequence from={915} durationInFrames={165}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
