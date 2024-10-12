// https://vitest.dev/guide/workspace
import { defineWorkspace } from "vitest/config";

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
  {
    test: {
      globals: true,
      name: "node",
      include: ["{test,test-vitest}/**/*.test.{ts,js}"],
      environment: "node",
      // setupFiles: ['./setup.init.js'],
    },
  },
]);
