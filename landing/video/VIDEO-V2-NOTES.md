# Rising Tides Promo Video v2 — Planning Notes

## Current Video Analysis

### What Works
- Good visual style (dark theme, gold accents, purple highlights)
- Pain points hook is effective
- Four layers architecture visualization is clear
- One command install is compelling

### What Needs Improvement

1. **Branding**: "Rising Tides Skills Pack" → "Rising Tides Starter Pack"
   - It's not just skills — it's a complete development environment

2. **Outdated numbers**: Need to update throughout
   - Skills: 180 → 187
   - Plugins: 37 → 38
   - MCPs: 17 → 18

3. **Missing key value props**:
   - Doesn't explain what "one command" actually installs
   - Doesn't showcase the CLIs that come integrated
   - Doesn't show the MCPs in a memorable way
   - Doesn't mention Claude Code installation

4. **What actually gets installed** (not shown clearly):
   ```
   Prerequisites:
   ├── Node.js 20+
   ├── Git
   ├── Python 3
   └── Build tools (platform-specific)

   Claude Code:
   └── Installed or updated automatically

   Rising Tides Pack:
   ├── 187 Production-Ready Skills
   ├── 38 Pre-Configured Plugins
   ├── 18 MCP Integrations
   └── 9 CLI Tools Documented
   ```

---

## What the Starter Pack Actually Includes

### Prerequisites Installed
| Platform | What Gets Installed |
|----------|---------------------|
| Mac | Xcode CLI, Homebrew, Python 3, Git, Node.js 20, jq |
| Linux | Build essentials, Python 3, curl, Git, Node.js 20 |
| Windows | Git, Python 3, Node.js LTS |

### Claude Code
- Installed automatically if not present
- Updated to latest if already installed
- Configured with optimal settings

### Skills (187 total)
Categories:
- Frontend (React, Vue, Angular, TypeScript)
- Backend (Django, Rails, FastAPI, NestJS)
- DevOps (Docker, K8s, Terraform, CI/CD)
- Marketing/SEO (16 skills)
- Security (code review, audits, testing)
- Architecture (C4, MCP, plugins)
- Documentation (diagrams, office files)
- And more...

### Plugins (38 total)
Key plugins:
- `react-dev-plugin` — React + Context7 live docs
- `frontend-design-plugin` — UI/UX + live docs
- `webapp-testing-plugin` — Playwright E2E
- `video-generator-plugin` — Remotion video
- `git-workflow-plugin` — GitHub CLI + MCP
- `browser-automation-plugin` — Claude in Chrome

### MCPs (18 total)
| MCP | Purpose |
|-----|---------|
| context7 | Live library documentation |
| playwright | Browser automation, E2E testing |
| remotion | Programmatic video generation |
| github | GitHub API operations |
| memory | Persistent knowledge graph |
| claude-in-chrome | Full browser control |
| shadcn | Component registry |
| perplexity | Web search/research |
| docker | Container management |
| github-actions | CI/CD workflows |
| linear | Issue tracking |
| postgres | Database operations |
| sentry | Error monitoring |
| slack | Messaging |
| n8n | Workflow automation |
| tavily | Web search |
| elevenlabs | Voice generation |
| deepgram | Speech-to-text |

### CLIs (9 documented)
| CLI | Purpose | Auth Command |
|-----|---------|--------------|
| `gh` | GitHub repos, PRs, issues, Actions | `gh auth login` |
| `stripe` | Payments, products, webhooks | `stripe login` |
| `vercel` | Deployment, env vars, domains | `vercel login` |
| `netlify` | Deployment, functions | `netlify login` |
| `firebase` | Firestore, Auth, Hosting | `firebase login` |
| `supabase` | Database, auth, realtime | `supabase login` |
| `gcloud` | Cloud Run, Functions | `gcloud auth login` |
| `jira` | Issues, sprints, workflow | `jira init` |
| `datadog` | Logs, metrics, monitoring | env vars |

---

## Video v2 Structure

### New Scene Flow (~100 seconds)

1. **Pain Points** (0:00 - 0:12)
   - Building skills from scratch
   - MCPs that break every update
   - 40% context gone

2. **The Solution** (0:12 - 0:18)
   - Logo reveal
   - "Rising Tides Starter Pack"

3. **What You Get** (0:18 - 0:35)
   - Complete development environment
   - Show the breakdown:
     - Prerequisites installed ✓
     - Claude Code installed ✓
     - 187 Skills ✓
     - 38 Plugins ✓
     - 18 MCPs ✓
     - 9 CLIs ✓

4. **The CLIs** (0:35 - 0:50)
   - Show the 9 CLIs with logos/icons
   - gh, stripe, vercel, netlify, firebase, supabase, gcloud, jira, datadog
   - "Deploy to Vercel. Accept payments with Stripe. Push to GitHub. All from Claude."

5. **The MCPs** (0:50 - 1:05)
   - Show key MCPs
   - Context7: Live documentation
   - Playwright: Browser testing
   - Memory: Persistent knowledge
   - "APIs that work. Documentation that's always current."

6. **How It Works** (1:05 - 1:18)
   - Describe task → Auto-match → Skills load → MCPs activate
   - "No slash commands. Just describe what you need."

7. **Context Efficiency** (1:18 - 1:28)
   - 187 skills, ~7% context
   - "Not 40%. Seven."

8. **One Command Install** (1:28 - 1:38)
   - Mac / Linux / Windows
   - What it installs (checkmarks appearing)

9. **CTA** (1:38 - 1:45)
   - "Stop building skills. Start shipping code."
   - "A rising tide lifts all boats."

---

## Visual Improvements for v2

### Scene 3: What You Get (NEW)
Show a visual "installation tree" that builds up:
```
Rising Tides Starter Pack
├── ✓ Prerequisites (Node.js, Git, Python)
├── ✓ Claude Code
├── ✓ 187 Skills
├── ✓ 38 Plugins
├── ✓ 18 MCPs
└── ✓ 9 CLIs
```

### Scene 4: The CLIs (NEW)
Grid of CLI cards with icons:
```
┌─────┐ ┌─────┐ ┌─────┐
│ gh  │ │stripe│ │vercel│
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐
│netlify│ │firebase│ │supabase│
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐
│gcloud│ │ jira │ │datadog│
└─────┘ └─────┘ └─────┘
```

### Scene 5: The MCPs (NEW)
Animated connections showing MCP → Capability:
- context7 → "Live docs for any library"
- playwright → "Browser automation"
- memory → "Remember across sessions"
- remotion → "Generate videos"

---

## Key Messages to Emphasize

1. **"Starter Pack" not "Skills Pack"** — It's everything you need
2. **Prerequisites included** — Node, Git, Python installed automatically
3. **Claude Code included** — Installs/updates Claude Code itself
4. **CLIs are ready to use** — Just authenticate
5. **MCPs are pre-configured** — Zero-config via plugins
6. **Context efficient** — 7% not 40%
7. **One command** — Really is one command

---

## Commands to Run Remotion

Start development (port 6824):
```bash
cd "/mnt/c/Users/Nick M/Desktop/Projects/Global Skill Repo/github/landing/video"
npm run dev
```
Opens at: http://localhost:6824

Render final video:
```bash
npm run build
```
