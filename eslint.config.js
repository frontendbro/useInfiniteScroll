import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

        /** Stylistic */
      "@stylistic/indent": ["warn", 2],
      "@stylistic/quotes": ["warn", "single"],
      "@stylistic/semi": ["warn", "never"],
      "@stylistic/object-curly-spacing": ["warn", "always"],
      "@stylistic/no-multi-spaces": ["warn"],
      "@stylistic/no-multiple-empty-lines": ["warn", { "max": 1 }],
      "@stylistic/eol-last": ["warn", "never"],

      /** React */
      "react/jsx-wrap-multilines": ["warn", { "return": "never", "arrow": "never" }],
      "react/jsx-no-useless-fragment": ["warn"],
      "react/jsx-one-expression-per-line": ["warn"],
      "react/self-closing-comp": ["warn", { "component": true, "html": true }],
      "react/jsx-first-prop-new-line": ["warn", "multiprop"],
      "react/jsx-max-props-per-line": ["warn", { "maximum": 1 }],
      "react/jsx-boolean-value": ["warn", "always"],
      "react/jsx-tag-spacing": ["warn", { "beforeSelfClosing": "never" }],
      "react/jsx-closing-bracket-location": ["warn", "line-aligned"]
    },


    
  },
)
