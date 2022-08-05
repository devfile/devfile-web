/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import { docVersions } from './build-navigation-misc';
import type { DocsNavigation, VersionedDocsNavigation } from './build-navigation-misc';

export function getDocsNavigation(): DocsNavigation {
  const noVersionNavigation = yamlToJs(
    fs.readFileSync('./apps/landing-page/public/docs-navigation/no-version.yaml', 'utf8'),
  ) as VersionedDocsNavigation;

  const docsNavigation = docVersions.reduce((nav, version) => {
    const newNav = nav;

    newNav[version] = [
      ...noVersionNavigation,
      ...(yamlToJs(
        fs.readFileSync(`./apps/landing-page/public/docs-navigation/${version}.yaml`, 'utf8'),
      ) as VersionedDocsNavigation),
    ];

    return newNav;
  }, {} as DocsNavigation);

  return docsNavigation;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const outputDir = path.join(__dirname, 'dist');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, 'docs-navigation.json'),
  JSON.stringify(getDocsNavigation(), null, 2),
  {
    encoding: 'utf8',
  },
);
