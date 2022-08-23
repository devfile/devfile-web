/* eslint-disable @typescript-eslint/no-unsafe-call */
import fs from 'fs-extra';
import path from 'node:path';
// @ts-ignore - no types available
import { load as yamlToJs } from 'js-yaml';
import { docVersions, githubDocsUrl } from '@devfile-web/docs';
import type {
  DocsNavigation,
  VersionedDocsNavigation,
  Section,
  DocVersions,
} from '@devfile-web/docs';

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

export default function buildNavigation(config: Config): void {
  const { outputDir } = config;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(
    path.join(outputDir, 'navigation.json'),
    JSON.stringify(getNavigation(config), null, 2),
    {
      encoding: 'utf8',
    },
  );
}
