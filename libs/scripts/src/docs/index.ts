#!/usr/bin/env node
import { join } from 'node:path';
import buildDirectory from './build-directory';
import buildNavigation from './build-navigation';
import copyDevfileSchemas from './copy-devfile-schemas';

// eslint-disable-next-line unicorn/prefer-module
const basePath = join(__dirname, '/../../../../..');
const sourceDir = join(basePath, 'libs/docs');
const outputDir = join(basePath, 'dist/libs/nextjs-docs');
const nextjsDir = join(basePath, 'apps/landing-page/pages/docs');

// buildDirectory();
// buildNavigation();
// copyDevfileSchemas();
