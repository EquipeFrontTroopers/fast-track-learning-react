module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assign': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'class-methods-use-this': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-no-bind': 'off',
    'linebreak-style': 'off',
  },
};
