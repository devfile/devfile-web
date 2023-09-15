#!/usr/bin/env node

/**
 * Copyright Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { join } from 'node:path';
import buildDirectory from './build-directory';
import buildNavigation from './build-navigation';
import copyDevfileSchemas from './copy-devfile-schemas';
import generateDevfileSpecType from './generate-devfile-spec-type';

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
generateDevfileSpecType({
  sourceDir: join(sourceDir, 'devfile-schemas'),
  outputDir: join(basePath, 'libs/core/src/types'),
}).catch(() => {});
