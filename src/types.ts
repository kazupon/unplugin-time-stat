/**
 * The raw data of the build time
 */
export type RawData = {
  /**
   * The start date of the build
   */
  start: Date
  /**
   * The end date of the build
   */
  end: Date
}

/**
 * Cusomt hook for the build time
 *
 * @param {number} buildTime - The build time in **seconds**
 * @param {RawData} raw - The raw data
 * @returns {Promise<string | void> | string | void} if you will return a string, it output to console as build time, which mean you should format build time that is measured.
 */
export type BuildTimeHook = (buildTime: number, raw: RawData) => Promise<string | void> | string | void

/**
 * Options for the plugin
 */
export interface Options {
  /**
   * Cusomt hook for the build time, see details in {@link BuildTimeHook}
   */
  hook?: BuildTimeHook
}
