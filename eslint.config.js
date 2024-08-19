import globals from "globals"
import js from '@eslint/js';
import jsdoc from "eslint-plugin-jsdoc";
import vitest from "eslint-plugin-vitest";

export default [
  {
    ignores: [
      "**/fixtures/**",
      "**/dist/**",
      "node_modules/*"
    ]
  },
  js.configs.recommended,
  {
    files: [
      "**/*.cjs",
      "**/*.mjs",
      "**/*.js"
    ],
    languageOptions: {
      globals: {
        ...globals.node
      },
    },
    plugins: {
      jsdoc: jsdoc,
      vitest: vitest,
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
    }
  }
];
