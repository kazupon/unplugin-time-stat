import { createUnplugin } from 'unplugin'

import type { UnpluginFactory } from 'unplugin'
import type { Options, BuildTimeHook, RawData } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = ({ hook = undefined }: Options = {}) => {
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
    async writeBundle() {
      const time = (endDate.getTime() - startDate.getTime()) / 1000

      let output: string | undefined = undefined
      if (hook) {
        try {
          output = (await hook(time, { start: startDate, end: endDate })) as string | undefined
        } catch (e) {
          console.log(e)
        }
      } else {
        output = `Build time: ${time.toFixed(3)}s`
      }
      if (output) {
        // eslint-disable-next-line no-console
        console.log(output)
      }
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export type { BuildTimeHook, RawData }
export default unplugin
