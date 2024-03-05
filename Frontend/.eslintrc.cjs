module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'tailwindcss'],
  rules: {
    'no-unused-vars': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'off',
    'tailwindcss/no-embedded-styles': 'off',
    'tailwindcss/no-unsupported-class': 'off',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-unknown-class': 'off',
    'tailwindcss/no-unused-class': 'off'
  },
  overrides: [
    {
      files: ['**/*.css'],
      rules: {
        'tailwindcss/no-unknown-at-rule': null,
        'tailwindcss/no-apply': null
      }
    }
  ]
};
