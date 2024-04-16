module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: __dirname,
      },
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['import', 'react-refresh', 'eslint-plugin-import-helpers'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../*'],
      },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prefer-template': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react/prop-types': 'off',
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@/app/',
          '/^@/pages/',
          '/^@/widgets/',
          '/^@/entities/',
          '/^@/shared/',
          'parent',
          'sibling',
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['./src/shared/shadcn-ui/**/*'],
      rules: {
        'react-refresh/only-export-components': 'off',
      },
    },
  ],
};
