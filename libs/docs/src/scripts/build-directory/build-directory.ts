/* eslint-disable unicorn/prefer-module */
import fs from 'fs-extra';
import path from 'node:path';
import { docVersions } from '../../types';

const sourceDir = path.join(__dirname, '../../docs');
const outputDir = path.join(__dirname, 'dist/docs');

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

function buildDirectory(): void {
  docVersions.forEach((version) => {
    fs.copySync(`${sourceDir}/${version}`, `${outputDir}/${version}`, { overwrite: true });
    fs.copySync(`${sourceDir}/no-version`, `${outputDir}/${version}`, { overwrite: true });
  });
}

buildDirectory();
