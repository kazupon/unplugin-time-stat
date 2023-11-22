import eslintConfigPrettier from 'eslint-config-prettier'
import tsEsLintPlugin from '@typescript-eslint/eslint-plugin'
import tsEsLintParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist', 'coverage', 'playground', '.eslintcache']
  },
  eslintConfigPrettier,
  {
    plugins: {
      '@typescript-eslint': tsEsLintPlugin
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    languageOptions: {
      parser: tsEsLintParser,
      parserOptions: {
        project: true
      }
    },
    rules: {
      ...tsEsLintPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...tsEsLintPlugin.configs['recommended-type-checked'].rules
      // you can add any rules here
      // '@typescript-eslint/no-explicit-any': 'error'
    }
  }
]
