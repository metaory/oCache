module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'xo'
  ],
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'semi': [1, 'never'],
    'indent': [1, 2],
    'quote-props': [1, 'consistent'],
    'comma-dangle': 0,
    'brace-style': 0,
    'no-trailing-spaces': 0,
    'no-warning-comments': 0,
    'camelcase': [1, {ignoreDestructuring: true}],
    'prefer-destructuring': 0,
  }
}
