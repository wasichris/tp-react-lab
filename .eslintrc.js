module.exports = {
  env: {
    browser: true, // browser global variables
    es6: true, // enable all ECMAScript 6 features except for modules
    jquery: true, // jQuery global variables
    worker: true // web workers global variables
  },
  extends: [
    'standard', // eslint-config-standard
    'standard-react' // eslint-config-standard-react
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks' // rules for hooks (eslint-plugin-react-hooks)
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
