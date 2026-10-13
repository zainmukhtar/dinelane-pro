import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import base from './base.mjs';

export default defineConfig([...base, ...nextVitals, ...nextTypeScript]);
