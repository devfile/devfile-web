/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-module */
import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import { docVersions } from '../../types';
import type { DocsNavigation, VersionedDocsNavigation } from '../../types';

const sourceDir = './apps/landing-page/public/docs-navigation';
const outputDir = path.join(__dirname, 'dist');

export interface NoVersionNavigation {
  top: VersionedDocsNavigation;
  bottom: VersionedDocsNavigation;
}

export function getNavigation(): DocsNavigation {
  const noVersionNavigation = yamlToJs(
    fs.readFileSync(`${sourceDir}/no-version.yaml`, 'utf8'),
  ) as NoVersionNavigation;

  const { top, bottom } = noVersionNavigation;

  const docsNavigation = docVersions.reduce((nav, version) => {
    const newNav = nav;

    newNav[version] = [
      ...top,
      ...(yamlToJs(
        fs.readFileSync(`${sourceDir}/${version}.yaml`, 'utf8'),
      ) as VersionedDocsNavigation),
      ...bottom,
    ];

    return newNav;
  }, {} as DocsNavigation);

  return docsNavigation;
}

export function buildNavigation(): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(
    path.join(outputDir, 'docs-navigation.json'),
    JSON.stringify(getNavigation(), null, 2),
    {
      encoding: 'utf8',
    },
  );
}

buildNavigation();
