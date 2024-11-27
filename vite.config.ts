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
        '@sentry/react-native': {
          version: '~15.2.0',
          '**/*.js': ['jsx']
        },
        'whatwg-url-without-unicode': {
          '**/*.js': (contents) =>
            contents
              ?.replace(
                /punycode\.ucs2\.decode/gm,
                '(punycode.ucs2decode || punycode.ucs2.decode)'
              )
              ?.replace(
                /punycode\.ucs2\.encode/gm,
                '(punycode.ucs2encode || punycode.ucs2.encode)'
              ),
        },
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
