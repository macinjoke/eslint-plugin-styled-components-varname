module.exports = {
  env: {
    node: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 2,
  },
}
