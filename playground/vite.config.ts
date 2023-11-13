import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import TimeStat from '../src/vite'

export default defineConfig({
  plugins: [Inspect(), TimeStat()]
})
