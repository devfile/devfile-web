/* eslint-disable unicorn/prefer-module */
import fs from 'fs-extra';
import path from 'node:path';

const sourceDir = path.join(__dirname, '../../devfile-schemas');
const outputDir = path.join(__dirname, '../../../../../apps/landing-page/public/devfile-schemas');

export function copyDevfileSchemas(): void {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  fs.copySync(sourceDir, outputDir, { overwrite: true });
}

copyDevfileSchemas();
