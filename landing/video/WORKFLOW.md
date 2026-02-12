# Rising Tides Promo Video — Production Workflow

> Last Updated: February 12, 2026

---

## Overview

This document outlines the workflow for producing the Rising Tides promotional video using:
- **Remotion** - React-based video framework
- **ElevenLabs** - Voice generation (Nick's PVC clone)
- **Deepgram** - Word-level timestamps for audio sync

---

## Production Pipeline

```
1. Write Script     → With SSML breaks for natural pacing
2. Estimate Timing  → Calculate frames from script
3. Build Video      → Remotion composition (visual first)
4. Preview/Approve  → Remotion Studio (npm run dev)
5. Generate Audio   → ElevenLabs with PVC voice
6. Get Timestamps   → Deepgram Nova-3 for word-level timing
7. Sync Video       → Match visuals to actual audio timing
8. Final Preview    → Adjust as needed
9. Render           → Final MP4
```

---

## 1. Script Writing

### Format for ElevenLabs v2 (PVC Voice)

Nick's Professional Voice Clone is fine-tuned for v2 models only. Use SSML breaks:

```
Text here. <break time="1s" /> More text.

<break time="1.5s" />

Next paragraph with energy! Use exclamation marks for emphasis.

Ellipses create natural hesitation... like this.
```

### Pause Guidelines

| Pause Type | Syntax | Use For |
|------------|--------|---------|
| Short | `<break time="0.5s" />` | Between clauses |
| Medium | `<break time="0.8s" />` | Between points |
| Long | `<break time="1.5s" />` | Section transitions |
| Dramatic | `<break time="2s" />` | Major transitions |

### Tone Control (v2)

- `!` - Adds energy/emphasis
- `?` - Question intonation
- `...` - Natural hesitation
- ALL CAPS - Avoid (sounds robotic)

---

## 2. Timing Estimation

Before generating audio, estimate timing from script:

```typescript
import { estimateSpeakingDuration, estimateFrames } from './src/themes/rising-tides';

const script = `Your script with <break time="1s" /> pauses here.`;
const seconds = estimateSpeakingDuration(script); // ~X seconds
const frames = estimateFrames(script); // ~X frames at 30fps
```

**Average speaking rate:** ~150 words per minute (2.5 words/second)

---

## 3. ElevenLabs Voice Generation

### Nick's Voice Details

- **Voice Name:** Me
- **Voice ID:** `1Y1SzskFPZmXbMMXYguT`
- **Category:** Professional Voice Clone (PVC)
- **Fine-tuned Models:** eleven_multilingual_v2, eleven_turbo_v2_5, eleven_flash_v2_5

### Recommended Settings

```
model_id: eleven_multilingual_v2
stability: 0.5
similarity_boost: 0.75
style: 0.3
speed: 1.0
output_format: mp3_44100_128
```

### Output Location

Save audio to: `github/landing/video/audio/`

---

## 4. Deepgram Timestamps

### Account Details

- **Console:** https://console.deepgram.com
- **Playground:** https://playground.deepgram.com/?endpoint=listen&model=nova-3
- **Model:** Nova-3 (latest, most accurate)

### API Response Structure

Deepgram returns word-level timestamps:

```json
{
  "results": {
    "channels": [{
      "alternatives": [{
        "transcript": "Building skills from scratch...",
        "words": [
          {
            "word": "building",
            "start": 0.08,
            "end": 0.48,
            "confidence": 0.997,
            "punctuated_word": "Building"
          }
        ]
      }]
    }]
  }
}
```

### Converting to Frames

```
frame = start_seconds × fps
```

Example at 30fps:
- Word starts at 5.28 seconds
- Frame = 5.28 × 30 = 158.4 → frame 158

---

## 5. Commands

### Start Remotion Studio
```bash
cd github/landing/video
npm run dev
```

### Render Video
```bash
npm run build
```

Output: `out/rising-tides-promo.mp4`

### Check TypeScript
```bash
npm run lint
```

---

## File Structure

```
github/landing/video/
├── audio/                  ← ElevenLabs voiceover outputs
├── output/                 ← Rendered final videos (gitignored)
├── out/                    ← Default Remotion output
├── public/                 ← Static assets (images, logos)
├── src/
│   ├── themes/
│   │   └── rising-tides.ts ← Design tokens + helpers
│   ├── components/         ← Reusable components
│   ├── scenes/             ← Scene components
│   ├── PromoVideo.tsx      ← Main composition
│   └── index.tsx           ← Entry point
├── package.json
├── VOICEOVER-SCRIPT.md     ← Script for ElevenLabs
└── WORKFLOW.md             ← This file
```

---

## Current Status

### Promo Video v2

**Phase 1: Setup** ✅
- [x] Rewrite script with SSML breaks (VOICEOVER-SCRIPT-V2.md)
- [x] Project setup (package.json, folders, theme)
- [x] Planning complete (VIDEO-V2-NOTES.md)

**Phase 2: Build Video** (IN PROGRESS)
- [ ] Update core files (theme.ts, PromoVideo.tsx, RisingTidesPromo.tsx)
- [ ] Rebuild Scene 1: PainPoints.tsx
- [ ] Rebuild Scene 2: LogoReveal.tsx (add "Starter Pack")
- [ ] Create Scene 3: WhatYouGet.tsx (NEW)
- [ ] Create Scene 4: TheCLIs.tsx (NEW)
- [ ] Create Scene 5: TheMCPs.tsx (NEW)
- [ ] Rebuild Scene 6: HowItWorks.tsx
- [ ] Rebuild Scene 7: ContextEfficiency.tsx
- [ ] Rebuild Scene 8: OneCommandInstall.tsx
- [ ] Rebuild Scene 9: CallToAction.tsx
- [ ] Add scene transitions (@remotion/transitions)
- [ ] Preview and adjust timing

**Phase 3: Audio** (LATER)
- [ ] Generate audio with ElevenLabs PVC voice
- [ ] Get Deepgram timestamps
- [ ] Sync video to audio timing
- [ ] Final preview and adjustments

**Phase 4: Deploy**
- [ ] Render final MP4
- [ ] Copy to landing-next/public/video/
- [ ] Deploy to Vercel

---

## Resources

- [Remotion Docs](https://www.remotion.dev/docs/)
- [ElevenLabs Docs](https://elevenlabs.io/docs)
- [Deepgram Docs](https://developers.deepgram.com/docs)
- [VOICEOVER-SCRIPT.md](./VOICEOVER-SCRIPT.md) - Current script
