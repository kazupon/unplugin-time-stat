/**
 * The raw data of the build time
 */
type RawData = {
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
 * Options for the plugin
 */
export interface Options {
  /**
   * Whether to print the build time to the console on {@link hook}
   *
   * @default true
   */
  silentOnHook?: boolean
  /**
   * Cusomt hook for the build time
   *
   * @param {number} buildTime - The build time in seconds
   * @param {RawData} raw - The raw data
   * @returns
   */
  hook?: (buildTime: number, raw: RawData) => void
}
