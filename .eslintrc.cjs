const { createConfig } = require('eslint-config-galex/dist/createConfig');
const { getDependencies } = require('eslint-config-galex/dist/getDependencies');
const {
  createReactOverride,
} = require('eslint-config-galex/dist/overrides/react');
const {
  createTypeScriptOverride,
} = require('eslint-config-galex/dist/overrides/typescript');

const dependencies = getDependencies();

module.exports = createConfig({
  rules: {
    'sort-keys-fix/sort-keys-fix': 'off', // keys should be sorted based on significance
    'import/no-default-export': 'off', // default exports are common in React
    'no-negated-condition': 'off', // ternaries are sometimes more readable when `true` branch is most significant branch

    // Prefer explicit, consistent return - e.g. `return undefined;`
    'unicorn/no-useless-undefined': 'off',
    'consistent-return': 'error',

    // Properties available after typeguard may be tedious to destructure (e.g. in JSX)
    'unicorn/consistent-destructuring': 'off',

    // Not really more readable and makes Jest crash
    'unicorn/prefer-prototype-methods': 'off',

    /* Forcing use of `else` for consistency with mandatory `default` clause in `switch` statements is unreasonable.
     * `if`/`else if` serves a different purpose than `switch`. */
    'sonarjs/elseif-without-else': 'off',
  },
  overrides: [
    createReactOverride({
      ...dependencies,
      rules: {
        'react/jsx-no-constructed-context-values': 'off', // too strict
      },
    }),
    createTypeScriptOverride({
      ...dependencies,
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off', // too strict
        '@typescript-eslint/lines-between-class-members': 'off', // allow grouping single-line members
        '@typescript-eslint/prefer-nullish-coalescing': 'off', // `||` is often conveninent and safe to use with TS
        '@typescript-eslint/explicit-module-boundary-types': 'off', // worsens readability sometimes (e.g. for React components)
        '@typescript-eslint/no-unnecessary-type-arguments': 'off', // lots of false positives

        // Galex expects TypeScript options `noUnusedLocals` and `noUnusedParameters` to be enabled,
        // but those prevent compilation, which is bad for developer experience
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { ignoreRestSiblings: true },
        ],

        // Allow writing void-returning arrow functions in shorthand to save space
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],

        // Prefer `interface` over `type`
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // Disallows calling function with value of type `any` (disabled due to false positives)
        // Re-enabling because has helped fix a good number of true positives
        '@typescript-eslint/no-unsafe-argument': 'warn',

        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow', // `never` is too strict
          },
        ],
      },
    }),
  ],
});
