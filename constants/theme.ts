export const colors = {
  // Brand
  primary: "#1E3A8A",      // Dark automotive blue
  primaryLight: "#2563EB", // Vibrant blue
  primaryMuted: "#EFF6FF", // Very light blue tint
  accent: "#0284C7",       // Sky accent

  // Status & Highlights
  success: "#059669",      // Emerald for price and success
  successLight: "#ECFDF5", // Light emerald tint
  warning: "#D97706",      // Amber
  danger: "#DC2626",       // Crimson red
  dangerLight: "#FEF2F2",

  // Backgrounds & Surfaces
  background: "#F8FAFC",   // Clean Slate-50 background
  card: "#FFFFFF",         // White surface
  cardAlt: "#F1F5F9",      // Slate-100
  border: "#E2E8F0",       // Slate-200 border
  borderSubtle: "#F1F5F9",

  // Text
  textPrimary: "#0F172A",   // Slate-900 high contrast
  textSecondary: "#475569", // Slate-600 readable secondary
  textMuted: "#94A3B8",     // Slate-400 placeholder & hints
  textInverted: "#FFFFFF",
};

export const shadows = {
  card: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHover: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};
