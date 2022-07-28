/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import {
  docVersions,
  DocVersions,
  DocsNavigation,
  VersionedDocsNavigation,
} from './build-navigation-misc';

const defaultVersion: DocVersions = '2.2.0-alpha';

export function getDocsNavigation(): DocsNavigation {
  const noVersionNavigation = yamlToJs(
    fs.readFileSync('./apps/landing-page/public/docs-navigation/no-version.yaml', 'utf8'),
  ) as VersionedDocsNavigation;

  const versionedDocsNavigations = docVersions.reduce((nav, version) => {
    const newNav = nav;

    newNav[version] = [
      ...noVersionNavigation,
      ...(yamlToJs(
        fs.readFileSync(`./apps/landing-page/public/docs-navigation/${version}.yaml`, 'utf8'),
      ) as VersionedDocsNavigation),
    ];

    return newNav;
  }, {} as Record<DocVersions, VersionedDocsNavigation>);

  const docsNavigation: DocsNavigation = {
    ...versionedDocsNavigations,
    defaultVersion,
  };

  return docsNavigation;
}

const docsNavigation = getDocsNavigation();

fs.writeFileSync(
  path.join(__dirname, '../../../../apps/landing-page/public/docs-navigation/docs-navigation.json'),
  JSON.stringify(docsNavigation, null, 2),
  {
    encoding: 'utf8',
  },
);
