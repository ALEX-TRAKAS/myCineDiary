import { config as baseConfig } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui({
  ...baseConfig,
  themes: {
    light: {
      ...baseConfig.themes.light,
      background: '#f6f6f8',      
      color: '#000000',           
      primary: '#5b13ec',
      surface: '#ffffff',         
      font: 'body',                
      headingFont: 'display',      
    },
    dark: {
      ...baseConfig.themes.dark,
      background: '#161022',      
      color: '#ffffff',
      primary: '#5b13ec',
      surface: '#1f1c27',         
      font: 'body',
      headingFont: 'display',
    },
  },
  fonts: {
    display: {
      family: "'Be Vietnam Pro', 'Noto Sans', sans-serif",
      size: {
        1: 11,
        2: 13,
        3: 15,
        4: 17,
        5: 19,
        6: 21,
        7: 25,
        8: 35,
        9: 47,
        10: 63,
      },
    },
    body: {
      family: "'Noto Sans', sans-serif",
      size: {
        1: 11,
        2: 13,
        3: 15,
        4: 17,
        5: 19,
        6: 21,
        7: 25,
        8: 35,
        9: 47,
        10: 63,
      },
    },
  },
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends AppTamaguiConfig {}
}

export default tamaguiConfig;
