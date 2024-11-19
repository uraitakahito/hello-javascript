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

  parserOptions: {
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    sourceType: "module",
  },

  rules: {
    // https://eslint.org/docs/v8.x/rules/no-ternary
    "no-ternary": "off",
  },
};
