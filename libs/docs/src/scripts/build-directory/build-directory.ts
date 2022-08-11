/* eslint-disable unicorn/prefer-module */
import fs from 'fs-extra';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { docVersions } from '../../types';

const sourceDir = path.join(__dirname, '../../docs');
const outputDir = path.join(__dirname, 'dist/docs');
const nextjsDocsDir = path.join(__dirname, '../../../../../apps/landing-page/pages/docs');

function buildDirectory(): void {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  docVersions.forEach((version) => {
    fs.copySync(`${sourceDir}/${version}`, `${outputDir}/${version}`, { overwrite: true });
    fs.copySync(`${sourceDir}/no-version`, `${outputDir}/${version}`, { overwrite: true });
    execSync(`yarn create:devfile-schema ${version}`);
  });

  if (fs.existsSync(nextjsDocsDir)) {
    fs.rmSync(nextjsDocsDir, { recursive: true, force: true });
  }
  fs.copySync(outputDir, nextjsDocsDir, { overwrite: true });
}

buildDirectory();
