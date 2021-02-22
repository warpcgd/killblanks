module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'indent': ['error', 2],
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 0,
    'max-len': ['error', { code: 250 }],
    'no-template-curly-in-string': 0,
    'import/no-unresolved': 'off',
    //'import/extensions': 'off',
    'no-var-requires': 'off',
    'no-explicit-any': 'off',
  },
};
