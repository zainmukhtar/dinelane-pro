import globals from 'globals';
import { defineConfig } from 'eslint/config';
import base from './base.mjs';

export default defineConfig([
  ...base,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
