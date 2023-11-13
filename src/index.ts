import { createUnplugin } from 'unplugin'

import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = () =>
  // options
  {
    return {
      name: 'unplugin-stats',
      apply: 'build',
      buildStart() {},
      buildEnd() {},
      writeBundle() {}
    }
  }

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
