/* eslint-disable max-len */

//
// eslint-config-airbnb*
//
// > Use eslint v8 until such time as our configs support v9:
// https://github.com/airbnb/javascript/issues/2961
//
// Backwards compatibility utility is available:
// https://eslint.org/blog/2022/08/new-config-system-part-2/#backwards-compatibility-utility
//
// peerDependencies:
// https://github.com/airbnb/javascript/blob/11f986fdc7d6b4c80e396437e9c45c939362bdee/packages/eslint-config-airbnb-base/package.json#L82-L85
//

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
  extends: [
    'eslint:all',
    // airbnb includes React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
    // airbnb-base does not include React
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/index.js
    'airbnb-base',
    // 'airbnb',
  ],

  ignorePatterns: ['dist/'],

  overrides: [
    {
      files: ['test/**', 'src/__tests__/*.test.js'],
      rules: {
        // Magic numbers are frequently used in tests, so disable this rule
        // https://eslint.org/docs/v8.x/rules/no-magic-numbers
        'no-magic-numbers': 'off',
      },
    },
  ],

  parserOptions: {
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    ecmaVersion: 2024,
    // https://eslint.org/docs/v8.x/use/configure/language-options#specifying-parser-options
    sourceType: 'module',
  },

  rules: {
    // https://eslint.org/docs/v8.x/rules/capitalized-comments
    'capitalized-comments': 'off',

    //
    // https://eslint.org/docs/v8.x/rules/func-style
    // https://github.com/airbnb/javascript?tab=readme-ov-file#functions--declarations
    //
    'func-style': ['error', 'expression'],

    // https://eslint.org/docs/v8.x/rules/id-length
    'id-length': 'off',

    //
    // When importing ES modules without using a bundler or transpiler, file extensions are required:
    //   https://nodejs.org/api/esm.html#esm_mandatory_file_extensions
    //   https://github.com/import-js/eslint-plugin-import/blob/v2.17.2/docs/rules/extensions.md#examples
    //
    'import/extensions': ['error', 'always', { ignorePackages: true }],

    //
    // https://engineering.linecorp.com/ja/blog/you-dont-need-default-export
    // https://zenn.dev/odiak/articles/9aa48e892e8141
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
    //
    'import/no-anonymous-default-export': ['error', { allowCallExpression: false }],

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test/*.js', 'src/__tests__/*.test.js', 'rollup.*.js'],
        peerDependencies: false,
      },
    ],
    // https://eslint.org/docs/v8.x/rules/line-comment-position
    'line-comment-position': 'off',
    // https://eslint.org/docs/v8.x/rules/multiline-comment-style
    'multiline-comment-style': 'off',
    // https://eslint.org/docs/v8.x/rules/no-inline-comments
    'no-inline-comments': 'off',
    // https://eslint.org/docs/v8.x/rules/no-magic-numbers
    'no-magic-numbers': [
      'error', {
        detectObjects: false,
        enforceConst: true,
        ignore: [1],
        ignoreArrayIndexes: true,
        ignoreClassFieldInitialValues: true,
      },
    ],
    // https://eslint.org/docs/latest/rules/no-param-reassign
    // https://github.com/airbnb/javascript/issues/1217
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['^element'] }],

    //
    // https://eslint.org/docs/v8.x/rules/no-restricted-syntax
    // https://zenn.dev/pirosikick/articles/f57c573282b3d8
    //
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // https://eslint.org/docs/v8.x/rules/no-ternary
    'no-ternary': 'off',
    // https://eslint.org/docs/latest/rules/no-underscore-dangle
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    // https://eslint.org/docs/v8.x/rules/one-var
    'one-var': 'off',
    // https://eslint.org/docs/v8.x/rules/sort-imports
    'sort-imports': [
      'error',
      {
        ignoreCase: false,

        //
        // Enabling all sort-imports rules can sometimes cause a deadlock
        // e.g.
        // https://github.com/uraitakahito/hello-javascript-jest/blob/2ecf6806d8289a884e4c2241fa2e4544039b27c8/src/__tests__/forEach.test.js#L1-L2
        //
        ignoreDeclarationSort: true,

        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

  },
};
