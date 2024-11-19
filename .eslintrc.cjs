module.exports = {
  /*
   * https://github.com/eslint/eslintrc/blob/main/conf/environments.js
   */
  env: {
    browser: true,
    es2024: true,
    node: true,
  },

  /*
   * https://eslint.org/docs/v8.x/use/configure/configuration-files#extending-configuration-files
   */
  extends: "eslint:all",

  /*
   * https://github.com/jest-community/eslint-plugin-jest
   */
  overrides: [
    {
      /*
       * IMPORTANT: `all configuration` is not recommended for production use because it changes with every minor and major version of ESLint. Use it at your own risk.
       * https://eslint.org/docs/v8.x/use/configure/configuration-files#using-eslintall
       */
      extends: ["plugin:jest/all"],
      files: ["test/**", "test-jest/**"],
      // You can omit the eslint-plugin- prefix
      plugins: ["jest"],
      rules: {
        // https://eslint.org/docs/v8.x/rules/no-hooks
        "jest/no-hooks": "off",
        // https://github.com/jest-community/eslint-plugin-jest/blob/v28.9.0/docs/rules/prefer-importing-jest-globals.md
        "jest/prefer-importing-jest-globals": "off",
        // https://eslint.org/docs/v8.x/rules/no-magic-numbers
        "no-magic-numbers": "off",
      },
    },
  ],

  parserOptions: {
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    sourceType: "module",
  },

  rules: {
    // https://eslint.org/docs/v8.x/rules/capitalized-comments
    "capitalized-comments": "off",
    // https://eslint.org/docs/v8.x/rules/multiline-comment-style
    "multiline-comment-style": "off",
    // https://eslint.org/docs/v8.x/rules/no-ternary
    "no-ternary": "off",
  },

  // https://github.com/jest-community/eslint-plugin-jest?tab=readme-ov-file#jest-version-setting
  settings: {
    jest: {
      version: require("jest/package.json").version,
    },
  },
};