import { existsSync, rmSync, copySync } from 'fs-extra';
import { execSync } from 'node:child_process';
import { docVersions } from '../../types';

export interface Config {
  sourceDir: string;
  outputDir: string;
  nextjsDocsDir: string;
}

export default function buildDirectory(config: Config): void {
  const { sourceDir, outputDir, nextjsDocsDir } = config;

  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }

  docVersions.forEach((version) => {
    copySync(`${sourceDir}/${version}`, `${outputDir}/${version}`, { overwrite: true });
    copySync(`${sourceDir}/no-version`, `${outputDir}/${version}`, { overwrite: true });
    execSync(`yarn create:devfile-schema ${version}`);
  });

  if (existsSync(nextjsDocsDir)) {
    rmSync(nextjsDocsDir, { recursive: true, force: true });
  }
  copySync(outputDir, nextjsDocsDir, { overwrite: true });
}
