import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import { docVersions } from '../../types';

export interface Config {
  sourceDir: string;
  outputDir: string;
  nextjsDocsDir: string;
}

export default function buildDirectory(config: Config): void {
  const { sourceDir, outputDir, nextjsDocsDir } = config;

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  fs.copySync(`${nextjsDocsDir}/index.tsx`, `${outputDir}/index.tsx`);

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
