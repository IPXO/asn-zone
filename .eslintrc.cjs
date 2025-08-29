/* ESLint config for asn.zone (root) */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
    rules: {
    'unused-imports/no-unused-imports': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'react/prop-types': 'off',
    '@next/next/no-html-link-for-pages': 'off', // ← app router: no /pages
  },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/prop-types': 'off', // TS handles types
  },
  overrides: [
    {
      files: ['scripts/**/*.{ts,js}'],
      rules: { 'no-console': 'off' },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'apps/web/.next/',
    'apps/web/out/',
    'dist/',
    '.cache/',
    'coverage/',
    'data/snapshots/',
  ],
};
