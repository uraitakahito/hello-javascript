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
      rules: { "jest/prefer-expect-assertions": "off" },
    },
  ],

  parserOptions: {
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    sourceType: "module",
  },

  rules: {
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
