import type { UserConfig } from 'vite'
import { one } from 'one/vite'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

export default {
  ssr: {
    noExternal: true,
  },
  plugins: [
    one({
      web: {
        deploy: 'vercel',
        defaultRenderMode: 'ssg',
      },

      deps: {
        "@stytch/react-native": {
          '**/*.js':['flow', 'jsx']
        },
        "@stytch/react-native-inappbrowser-reborn": {
          '**/*.js':['flow', 'jsx']
        },
        'expo-linear-gradient': {
          '**/*.js': ['flow', 'jsx'],
        },
        '@sentry/react-native': {
          version: '~15.2.0',
          '**/*.js': ['jsx']
        }
      },

      app: {
        key: 'pygmy',
      },
    }),

    tamaguiPlugin({
      optimize: true,
      components: ['tamagui'],
      config: './config/tamagui.config.ts',
      outputCSS: './code/styles/tamagui.css',
    }),
  ],
} satisfies UserConfig
