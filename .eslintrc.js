const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = 'lib/rules'

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended', 'prettier'],
  plugins: ['prettier', 'rulesdir'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'prefer-arrow-callback': 2,
    'rulesdir/varname': 2,
  },
}
