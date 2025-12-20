import { config as baseConfig } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui({
  ...baseConfig,
  themes: {
    light: {
      ...baseConfig.themes.light,
      background: '#ffffff',
      color: '#000000',
      primary: '#6200ee',
    },
    dark: {
      ...baseConfig.themes.dark,
      background: '#000000',
      color: '#ffffff',
      primary: '#bb86fc',
      text: '#ffffff',
    },
  },
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
