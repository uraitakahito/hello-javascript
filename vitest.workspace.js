// https://vitest.dev/guide/workspace
import { defineWorkspace } from 'vitest/config'

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  {
    test: {
      name: 'node',
      include: ['test/**/*.test.{ts,js}'],
      environment: 'node',
      // setupFiles: ['./setup.init.js'],
    },
  },
  {
    test: {
      name: 'express',
      include: ['test/**/*.test.{ts,js}'],
      root: 'examples/express/etc',
      environment: 'node',
    },
  },
])
