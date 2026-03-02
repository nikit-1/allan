import { defineConfig, globalIgnores } from 'eslint/config';
import jsEslint from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
    {
        files: ['**/*.{ts,js}'],
    },
    globalIgnores(['node_modules/', 'dist/']),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    jsEslint.configs.recommended,
    ...tsEslint.configs.recommended,
]);
