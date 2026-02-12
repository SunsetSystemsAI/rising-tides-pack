# Rising Tides Promo Video v2 — Session Handoff

**Date:** February 12, 2026
**Status:** Ready to build video components

---

## Resume Prompt

```
Continue work on Rising Tides promo video v2.

## Context
We're doing a complete professional overhaul of the promo video in:
`github/landing/video/`

## What's Already Done
1. Project setup complete:
   - package.json updated with Remotion 4.0.421 + all packages
   - New packages: @remotion/transitions, @remotion/animation-utils, @remotion/media-utils, @remotion/shapes, @remotion/paths, @remotion/noise
   - Port configured: 6824 (not 3000)
   - Folder structure: audio/, output/, src/themes/, src/components/
   - ElevenLabs MCP configured in project .mcp.json

2. Planning docs complete:
   - VIDEO-V2-NOTES.md — Full analysis and scene structure
   - VOICEOVER-SCRIPT-V2.md — Script with SSML breaks (~112 seconds)
   - WORKFLOW.md — Production workflow
   - src/themes/rising-tides.ts — Design tokens + helpers

3. Script v2 written with 9 scenes:
   1. Pain Points (12s)
   2. The Solution / Logo (8s)
   3. What You Get (20s) — NEW: shows full installation tree
   4. The CLIs (15s) — NEW: all 9 CLIs named
   5. The MCPs (15s) — NEW: key MCPs highlighted
   6. How It Works (12s)
   7. Context Efficiency (10s)
   8. One Command Install (10s)
   9. CTA (10s)

## What Needs To Be Done
Systematically rebuild all scene components using the new capabilities:

### Phase 1: Update Core Files
- [ ] Update src/theme.ts to use new design tokens from src/themes/rising-tides.ts
- [ ] Update src/RisingTidesPromo.tsx with new duration (3360 frames) and scene timing
- [ ] Update src/PromoVideo.tsx with new scene sequence

### Phase 2: Rebuild Scenes (in order)
Each scene should use:
- @remotion/transitions for scene transitions (fade, slide, wipe)
- @remotion/animation-utils for smoother animations
- spring() animations for natural motion
- Proper timing from VOICEOVER-SCRIPT-V2.md

Scenes to rebuild:
1. src/scenes/PainPoints.tsx — Keep style, update timing
2. src/scenes/LogoReveal.tsx — Add "Starter Pack" text
3. src/scenes/WhatYouGet.tsx — NEW: Installation tree visualization
4. src/scenes/TheCLIs.tsx — NEW: Grid of 9 CLI cards
5. src/scenes/TheMCPs.tsx — NEW: MCP capability connections
6. src/scenes/HowItWorks.tsx — Simplify, update timing
7. src/scenes/ContextEfficiency.tsx — Keep style, update timing
8. src/scenes/OneCommandInstall.tsx — Update features list
9. src/scenes/CallToAction.tsx — Update to "Starter Pack"

### Phase 3: Polish
- [ ] Add scene transitions using @remotion/transitions
- [ ] Test full video flow
- [ ] Adjust timing as needed

## Key Files
- Script: github/landing/video/VOICEOVER-SCRIPT-V2.md
- Notes: github/landing/video/VIDEO-V2-NOTES.md
- Theme: github/landing/video/src/themes/rising-tides.ts
- Main: github/landing/video/src/PromoVideo.tsx

## Commands
Start Remotion Studio (PowerShell):
cd "C:\Users\Nick M\Desktop\Projects\Global Skill Repo\github\landing\video"; npm run dev

Opens at: http://localhost:6824

## Key Stats to Use
- Skills: 187
- Plugins: 38
- MCPs: 18
- CLIs: 9
- Context cost: ~7%

## CLIs (all 9)
gh, stripe, vercel, netlify, firebase, supabase, gcloud, jira, datadog

## MCPs to Highlight
context7, playwright, memory, remotion (show 4 key ones, mention 18 total)
```

---

## Project State

### Files Created/Updated This Session

| File | Status | Purpose |
|------|--------|---------|
| `.mcp.json` | Created | ElevenLabs MCP config |
| `package.json` | Updated | Remotion 4.0.421 + packages |
| `WORKFLOW.md` | Created | Production workflow |
| `VIDEO-V2-NOTES.md` | Created | Full analysis + planning |
| `VOICEOVER-SCRIPT-V2.md` | Created | Script with SSML breaks |
| `src/themes/rising-tides.ts` | Created | Design tokens + helpers |
| `audio/` | Created | For ElevenLabs output |
| `output/` | Created | For rendered videos |
| `src/components/` | Created | For reusable components |

### New Remotion Packages Available

| Package | Purpose | Use For |
|---------|---------|---------|
| `@remotion/transitions` | Scene transitions | Fade between scenes, slide in elements |
| `@remotion/animation-utils` | Animation helpers | Easing, interpolation helpers |
| `@remotion/media-utils` | Audio/video utils | Audio sync, duration detection |
| `@remotion/shapes` | Shape primitives | Rectangles, circles, polygons |
| `@remotion/paths` | SVG path animations | Animated lines, drawing effects |
| `@remotion/noise` | Procedural noise | Background textures, organic motion |

### Scene Timing (from script)

| Scene | Start Frame | Duration | End Frame |
|-------|-------------|----------|-----------|
| 1. Pain Points | 0 | 360 | 360 |
| 2. The Solution | 360 | 240 | 600 |
| 3. What You Get | 600 | 600 | 1200 |
| 4. The CLIs | 1200 | 450 | 1650 |
| 5. The MCPs | 1650 | 450 | 2100 |
| 6. How It Works | 2100 | 360 | 2460 |
| 7. Context Efficiency | 2460 | 300 | 2760 |
| 8. One Command | 2760 | 300 | 3060 |
| 9. CTA | 3060 | 300 | 3360 |

**Total: 3360 frames (112 seconds at 30fps)**

---

## Systematic Rebuild Approach

### Step 1: Core Infrastructure
Update the main composition files to use new timing and scene structure.

### Step 2: Scene-by-Scene Rebuild
Work through each scene in order:
1. Read the existing scene code
2. Update timing to match script
3. Add new Remotion features (transitions, animations)
4. Update content (numbers, text, branding)
5. Test in Remotion Studio

### Step 3: New Scenes
Build the 3 new scenes that don't exist yet:
- WhatYouGet.tsx (installation tree)
- TheCLIs.tsx (9 CLI cards)
- TheMCPs.tsx (MCP capabilities)

### Step 4: Transitions & Polish
Add `@remotion/transitions` between scenes for professional flow.

### Step 5: Audio Integration (Later)
After video approved:
1. Generate audio with ElevenLabs
2. Get Deepgram timestamps
3. Fine-tune video to audio sync

---

## Don't Forget

- Port is **6824** not 3000
- Name is "**Starter Pack**" not "Skills Pack"
- Updated numbers: 187 skills, 38 plugins, 18 MCPs, 9 CLIs
- All 9 CLIs should be named in Scene 4
- Context cost is ~7% (the hero stat)
