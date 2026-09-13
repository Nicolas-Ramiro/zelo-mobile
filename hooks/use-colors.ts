import { Colors, type ColorScheme, type ThemeColorPalette } from "@/constants/theme";
import { useThemeContext } from "@/lib/theme-provider";

const nativePalette: Record<ColorScheme, ThemeColorPalette> = {
  light: {
    primary: "#1F6F5C",
    background: "#FAF7F1",
    surface: "#FFFFFF",
    foreground: "#17342E",
    muted: "#718078",
    border: "#E7E3DB",
    success: "#1F6F5C",
    warning: "#D68A2C",
    error: "#C9564F",
    text: "#17342E",
    tint: "#1F6F5C",
    icon: "#718078",
    tabIconDefault: "#718078",
    tabIconSelected: "#1F6F5C",
  },
  dark: {
    primary: "#1F6F5C",
    background: "#17231F",
    surface: "#22332C",
    foreground: "#F7F5EF",
    muted: "#B8C4BE",
    border: "#3B4E45",
    success: "#55B39B",
    warning: "#F5BD68",
    error: "#F0847B",
    text: "#F7F5EF",
    tint: "#1F6F5C",
    icon: "#B8C4BE",
    tabIconDefault: "#B8C4BE",
    tabIconSelected: "#1F6F5C",
  },
};

/**
 * Returns the current theme's color palette.
 * Usage: const colors = useColors(); then colors.text, colors.background, etc.
 */
export function useColors(colorSchemeOverride?: ColorScheme): ThemeColorPalette {
  const { colorScheme } = useThemeContext();
  const scheme = (colorSchemeOverride ?? colorScheme ?? "light") as ColorScheme;
  return nativePalette[scheme] ?? Colors[scheme];
}
