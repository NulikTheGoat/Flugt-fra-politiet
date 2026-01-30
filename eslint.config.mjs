import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/**',
      'public/lib/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        THREE: 'readonly',
      },
    },
    rules: {
      // Keep the initial setup low-noise for an existing codebase.
      // Tighten these later once the baseline is clean.
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['server.js', '**/*.cjs', 'playwright.config.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['js/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
