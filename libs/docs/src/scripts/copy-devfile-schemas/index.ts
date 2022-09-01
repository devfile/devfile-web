import { existsSync, rmSync, copySync } from 'fs-extra';

export interface Config {
  sourceDir: string;
  outputDir: string;
}

export default function copyDevfileSchemas(config: Config): void {
  const { sourceDir, outputDir } = config;

  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }

  copySync(sourceDir, outputDir, { overwrite: true });
}
