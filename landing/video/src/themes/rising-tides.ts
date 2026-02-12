/**
 * Rising Tides Promo Theme
 * Design tokens for the promotional video
 */

// === COLORS ===
export const colors = {
  // Primary palette (matches landing page)
  primary: "#F59E0B", // Gold/amber - Rising Tides brand
  secondary: "#3B82F6", // Blue - accents
  accent: "#8B5CF6", // Purple - highlights

  // Backgrounds
  bgDark: "#0F172A", // Dark mode base
  bgCard: "#1E293B", // Card backgrounds
  bgGradientStart: "#0F172A",
  bgGradientEnd: "#1E293B",

  // Text
  textPrimary: "#F1F5F9", // Main text (dark bg)
  textSecondary: "#94A3B8", // Muted text
  textGold: "#F59E0B", // Emphasis text

  // Semantic
  success: "#22C55E", // Correct, completed
  warning: "#F59E0B", // Caution (same as primary)
  error: "#EF4444", // Errors, pain points
  info: "#06B6D4", // Information

  // Gradients (as CSS strings)
  gradientGold: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  gradientBlue: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
  gradientDark: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
} as const;

// === TYPOGRAPHY ===
// Based on 1080p (1920x1080)
export const typography = {
  // Font families
  fontPrimary: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
  fontCode: "JetBrains Mono, Fira Code, monospace",

  // 1080p sizes
  heading: 72,
  subheading: 48,
  body: 36,
  caption: 24,
  small: 18,

  // Font weights
  weightLight: 300,
  weightRegular: 400,
  weightMedium: 500,
  weightSemibold: 600,
  weightBold: 700,

  // Line heights
  lineHeightTight: 1.1,
  lineHeightNormal: 1.4,
  lineHeightRelaxed: 1.6,
} as const;

// === MOTION TIMINGS ===
// All durations in seconds - convert to frames: duration * fps
export const motion = {
  // Speed presets
  fast: 0.25,
  normal: 0.5,
  slow: 1.0,

  // Stagger delays
  staggerFast: 0.08,
  staggerNormal: 0.12,
  staggerSlow: 0.2,

  // Scene transitions
  sceneTransition: 0.4,

  // Specific animations
  fadeIn: 0.4,
  slideUp: 0.35,
  scaleIn: 0.3,
  typewriter: 0.03,
} as const;

// === EASING CURVES ===
export const easing = {
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeIn: [0.4, 0.0, 1, 1] as const,
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
  linear: [0, 0, 1, 1] as const,
} as const;

// === LAYOUT ===
export const layout = {
  width: 1920,
  height: 1080,
  fps: 30,

  safeMargin: {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80,
  },

  contentWidth: 1920 - 80 - 80,
  contentHeight: 1080 - 60 - 60,

  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
    xxl: 96,
  },
} as const;

// === HELPER FUNCTIONS ===

/**
 * Convert seconds to frames
 */
export const toFrames = (seconds: number, fps: number = layout.fps): number => {
  return Math.round(seconds * fps);
};

/**
 * Convert frames to seconds
 */
export const toSeconds = (frames: number, fps: number = layout.fps): number => {
  return frames / fps;
};

/**
 * Get staggered delay for item in list (in frames)
 */
export const getStaggerDelay = (
  index: number,
  staggerType: "fast" | "normal" | "slow" = "normal",
  fps: number = layout.fps
): number => {
  const delays = {
    fast: motion.staggerFast,
    normal: motion.staggerNormal,
    slow: motion.staggerSlow,
  };
  return toFrames(delays[staggerType] * index, fps);
};

/**
 * Estimate speaking duration from text
 * Average speaking rate: ~150 words per minute = 2.5 words per second
 * Add time for SSML breaks
 */
export const estimateSpeakingDuration = (text: string): number => {
  // Count words (excluding SSML tags)
  const textWithoutSSML = text.replace(/<[^>]+>/g, "");
  const wordCount = textWithoutSSML.split(/\s+/).filter(w => w.length > 0).length;

  // Base duration from word count (2.5 words per second)
  let duration = wordCount / 2.5;

  // Add time for SSML breaks
  const breakMatches = text.match(/<break time="([0-9.]+)s" \/>/g) || [];
  for (const match of breakMatches) {
    const timeMatch = match.match(/([0-9.]+)/);
    if (timeMatch) {
      duration += parseFloat(timeMatch[1]);
    }
  }

  return duration;
};

/**
 * Estimate frames needed for script section
 */
export const estimateFrames = (text: string, fps: number = layout.fps): number => {
  return toFrames(estimateSpeakingDuration(text), fps);
};

// === PROMO VIDEO STATS ===
export const promoStats = {
  skills: 187,
  plugins: 38,
  mcps: 18,
  clis: 9,
  contextCost: "~7%",
} as const;
