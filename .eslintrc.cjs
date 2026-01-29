/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  globals: {
    THREE: 'readonly',
  },
  rules: {
    // Keep the initial setup low-noise for an existing codebase.
    // Tighten these later once the baseline is clean.
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['server.js', '**/*.cjs', 'playwright.config.js'],
      env: { node: true },
      parserOptions: { sourceType: 'script' },
    },
    {
      files: ['tests/**/*.js'],
      env: { node: true },
    },
    {
      files: ['js/**/*.js'],
      env: { browser: true },
    },
  ],
};
