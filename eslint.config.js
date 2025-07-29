import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import perfectionist from 'eslint-plugin-perfectionist'
import tanstackQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
    { ignores: ['dist', 'src/client/*'] },
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
            perfectionist,
            '@tanstack/query': tanstackQuery,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react-refresh/only-export-components': 'off',

            // TanStack Query recommended rules
            ...tanstackQuery.configs.recommended.rules,

            // Perfectionist recommended-natural configuration
            ...perfectionist.configs['recommended-natural'].rules,
            'perfectionist/sort-enums': 'off',

            // Custom import sorting - React packages at top
            'perfectionist/sort-imports': [
                'error',
                {
                    groups: [
                        'react',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    customGroups: {
                        value: {
                            react: '^react',
                        },
                    },
                    newlinesBetween: 'always',
                },
            ],

            // Due to having the exact same types between evaluation types
            '@typescript-eslint/no-namespace': 'off',
        },
    },
    // Configuration for files that should ignore perfectionist rules
    {
        files: ['**/constants.ts'],
        rules: {
            'perfectionist/sort-objects': 'off',
            'perfectionist/sort-array-elements': 'off',
            'perfectionist/sort-class-members': 'off',
            'perfectionist/sort-named-exports': 'off',
            'perfectionist/sort-named-imports': 'off',
        },
    },
)
