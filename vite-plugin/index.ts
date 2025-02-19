import vue from '@vitejs/plugin-vue'
/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import imageLimit from './plugins/image-limit'
// import versionUpdatePlugin from './plugins/version-update'
import requireToUrlPlugin from './plugins/requireToUrlPlugin'
import createSvgIcon from './plugins/svg-icon'
import setupExtend from 'vite-plugin-vue-setup-extend'
import createAutoImport from './plugins/auto-import'

const PUBLIC_PATH: Record<string, string> = {
  egw: '/modules/environment-guarantee-web/',
}
function baseVitePlugins(viteEnv, isBuild) {
  const vitePlugins = [
    vue(),
    vueJsx(),
    UnoCSS(),
    createAutoImport(),
    imageLimit(viteEnv),
    requireToUrlPlugin(),
    createSvgIcon(isBuild),
    setupExtend(),
    viteMockServe({
      ignore: /^_/,
      mockPath: 'mock',
      watchFiles: true,
    }),
    createHtmlPlugin({
      inject: {
        data: {
          PUBLIC_PATH: PUBLIC_PATH[viteEnv.VITE_APP_TYPE] || '/',
          TITLE: viteEnv.VITE_APP_TITLE,
        },
      },
    }),
  ]
  return vitePlugins
}
export default function createVitePlugins(viteEnv: ImportMetaEnv, isBuild = false) {
  const vitePlugins = [...baseVitePlugins(viteEnv, isBuild)]
  if (isBuild) {
    // vitePlugins.push(versionUpdatePlugin({ viteEnv, version}))
    // vitePlugins.push(
    //   createHtmlPlugin({
    //     minify: true,
    //     pages: [
    //       {
    //         filename: 'index.html',
    //         // entry: '/src/main.ts',
    //         template: 'index.html',
    //       },
    //       {
    //         filename: `${version}.html`,
    //         // entry: '/src/main.ts',
    //         template: 'index.html',
    //       },
    //     ],
    //   }),
    // )
  }
  // if (viteEnv.VITE_APP_ENV !== 'development') vitePlugins.push(versionUpdatePlugin({ viteEnv, version}))
  return vitePlugins
}

export function createEgwVitePlugins(viteEnv: ImportMetaEnv, isBuild = false) {
  const vitePlugins = [...baseVitePlugins(viteEnv, isBuild)]
  if (isBuild) {
  }
  return vitePlugins
}
