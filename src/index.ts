import { createUnplugin } from 'unplugin'

import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = () =>
  // options
  {
    let startDate: Date
    let endDate: Date

    return {
      name: 'unplugin-stats',
      apply: 'build',
      buildStart() {
        startDate = new Date()
      },
      buildEnd() {
        endDate = new Date()
      },
      writeBundle() {
        const time = (endDate.getTime() - startDate.getTime()) / 1000
        // eslint-disable-next-line no-console
        console.log(`Build time: ${time.toFixed(3)}s`)
      }
    }
  }

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
