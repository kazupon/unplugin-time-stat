import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest'
import TimeStat from '../src/vite'

import type { UnpluginOptions, UnpluginBuildContext } from 'unplugin'
import type { RawData } from '../src/types'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
})

test('build time to console', async () => {
  const spyLog = vi.spyOn(console, 'log')
  const timeStat = TimeStat() as UnpluginOptions
  const mockContext = {} as UnpluginBuildContext

  await timeStat.buildStart!.call(mockContext)
  vi.advanceTimersByTime(2)
  await timeStat.buildEnd!.call(mockContext)
  await timeStat.writeBundle!()

  expect(spyLog).toHaveBeenCalledTimes(1)
  expect(spyLog).toHaveBeenCalledWith('Build time: 0.002s')
})

describe('custom hook', () => {
  test('basic', async () => {
    const spyLog = vi.spyOn(console, 'log')
    const hook = vi.fn()
    const timeStat = TimeStat({
      hook
    }) as UnpluginOptions
    const mockContext = {} as UnpluginBuildContext

    vi.setSystemTime(new Date(1700000000 * 1000))
    await timeStat.buildStart!.call(mockContext)
    vi.advanceTimersByTime(2)
    await timeStat.buildEnd!.call(mockContext)
    await timeStat.writeBundle!()

    expect(spyLog).not.toHaveBeenCalledTimes(1)
    expect(hook).toHaveBeenCalledTimes(1)
    expect(hook).toHaveBeenCalledWith(0.002, {
      start: new Date(1700000000 * 1000),
      end: new Date(1700000000 * 1000 + 2)
    })
  })

  test('async', async () => {
    const spyLog = vi.spyOn(console, 'log')
    const mock = vi.fn()
    const hook = async (buildTime: number, raw: RawData) => {
      await new Promise(resolve => {
        setTimeout(resolve, 2)
        mock(buildTime, raw)
      })
    }

    const timeStat = TimeStat({
      hook
    }) as UnpluginOptions
    const mockContext = {} as UnpluginBuildContext

    vi.setSystemTime(new Date(1700000000 * 1000))
    await timeStat.buildStart!.call(mockContext)
    vi.advanceTimersByTime(2)
    await timeStat.buildEnd!.call(mockContext)
    timeStat.writeBundle!() // eslint-disable-line @typescript-eslint/no-floating-promises
    vi.advanceTimersByTime(2)

    expect(spyLog).not.toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(0.002, {
      start: new Date(1700000000 * 1000),
      end: new Date(1700000000 * 1000 + 2)
    })
  })

  test('return string', async () => {
    const spyLog = vi.spyOn(console, 'log')
    const mock = vi.fn()
    const hook = (buildTime: number, raw: RawData) => {
      mock(buildTime, raw)
      return `Build time: ${raw.end.getTime() - raw.start.getTime()}`
    }
    const timeStat = TimeStat({
      hook
    }) as UnpluginOptions
    const mockContext = {} as UnpluginBuildContext

    vi.setSystemTime(new Date(1700000000 * 1000))
    await timeStat.buildStart!.call(mockContext)
    vi.advanceTimersByTime(2)
    await timeStat.buildEnd!.call(mockContext)
    await timeStat.writeBundle!()

    expect(spyLog).toHaveBeenCalledTimes(1)
    expect(spyLog).toHaveBeenCalledWith('Build time: 2')
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith(0.002, {
      start: new Date(1700000000 * 1000),
      end: new Date(1700000000 * 1000 + 2)
    })
  })
})
