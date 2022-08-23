import fs from 'fs-extra';

export interface Config {
  sourceDir: string;
  outputDir: string;
}

export default function copyDevfileSchemas(config: Config): void {
  const { sourceDir, outputDir } = config;

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  fs.copySync(sourceDir, outputDir, { overwrite: true });
}
