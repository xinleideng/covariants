import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
import type { Compiler, Configuration, WebpackPluginFunction, WebpackPluginInstance } from 'webpack'

import { addWebpackConfig } from './addWebpackConfig'

export function addWebpackPlugin(
  nextConfig: NextConfig,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/no-explicit-any
  plugin: WebpackPluginInstance | WebpackPluginFunction | ((this: Compiler, compiler: Compiler) => void) | any,
) {
  return addWebpackConfig(
    nextConfig,
    (nextConfig: NextConfig, webpackConfig: Configuration, { isServer }: WebpackConfigContext) => {
      if (!isServer) {
        if (webpackConfig?.plugins) {
          webpackConfig.plugins.push(plugin)
        } else {
          return { plugins: [plugin] }
        }
      }
      return webpackConfig
    },
  )
}
