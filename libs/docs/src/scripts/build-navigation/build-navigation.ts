/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable unicorn/prefer-module */
import fs from 'node:fs';
import path from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import { docVersions, githubDocsUrl } from '../../types';
import type { DocsNavigation, VersionedDocsNavigation, Section, DocVersions } from '../../types';

const sourceDir = path.join(__dirname, '../../navigation');
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
      ...top.map((section) => absoluteLinkMap(version, section, true)),
      ...(
        yamlToJs(fs.readFileSync(`${sourceDir}/${version}.yaml`, 'utf8')) as VersionedDocsNavigation
      ).map((section) => absoluteLinkMap(version, section)),
      ...bottom.map((section) => absoluteLinkMap(version, section, true)),
    ];

    return newNav;
  }, {} as DocsNavigation);

  return docsNavigation;
}

export function absoluteLinkMap(
  version: DocVersions,
  section: Section,
  noVersion?: boolean,
): Section {
  return {
    title: section.title,
    links: section.links.map((link) => {
      const href = link.href.replace(/^\.?\//, '');
      return {
        title: link.title,
        href: `/docs/${version}/${href}`,
        githubHref: `${githubDocsUrl}/${noVersion ? 'no-version' : version}/${href}.md`,
      };
    }),
  };
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
