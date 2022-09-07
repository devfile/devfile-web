#!/usr/bin/env node
import { join } from 'node:path';
import buildDirectory from './build-directory';
import buildNavigation from './build-navigation';
import copyDevfileSchemas from './copy-devfile-schemas';

const basePath = join(__dirname, '/../../../../..');
const sourceDir = join(basePath, 'libs/docs/src');
const outputDir = join(basePath, 'dist/libs/scripts');
const nextjsDir = join(basePath, 'apps/landing-page');

buildDirectory({
  sourceDir: join(sourceDir, 'docs'),
  outputDir: join(outputDir, 'docs'),
  nextjsDocsDir: join(nextjsDir, 'pages/docs'),
});
buildNavigation({
  sourceDir: join(sourceDir, 'navigation'),
  outputDir: join(outputDir, 'navigation'),
});
copyDevfileSchemas({
  sourceDir: join(sourceDir, 'devfile-schemas'),
  outputDir: join(nextjsDir, 'public/devfile-schemas'),
});
