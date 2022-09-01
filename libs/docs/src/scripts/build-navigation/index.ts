/* eslint-disable @typescript-eslint/no-unsafe-call */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs-extra';
import { join } from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import { docVersions, githubDocsUrl } from '../../config';
import type { DocsNavigation, VersionedDocsNavigation, Section, DocVersions } from '../../types';

export interface Config {
  sourceDir: string;
  outputDir: string;
}

export interface NoVersionNavigation {
  top: VersionedDocsNavigation;
  bottom: VersionedDocsNavigation;
}

export function getNavigation(config: Config): DocsNavigation {
  const { sourceDir } = config;

  const noVersionNavigation = yamlToJs(
    readFileSync(`${sourceDir}/no-version.yaml`, 'utf8'),
  ) as NoVersionNavigation;

  const { top, bottom } = noVersionNavigation;

  const docsNavigation = docVersions.reduce((nav, version) => {
    const newNav = nav;

    newNav[version] = [
      ...top.map((section) => absoluteLinkMap(version, section, true)),
      ...(
        yamlToJs(readFileSync(`${sourceDir}/${version}.yaml`, 'utf8')) as VersionedDocsNavigation
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

export default function buildNavigation(config: Config): void {
  const { outputDir } = config;

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }

  writeFileSync(
    join(outputDir, 'navigation.json'),
    JSON.stringify(getNavigation(config), null, 2),
    {
      encoding: 'utf8',
    },
  );
}
