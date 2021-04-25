module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
        project: './tsconfig.json',
    },
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/prefer-default-export': 'off'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};