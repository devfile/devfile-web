import { docVersions } from '../config';

export type DocVersions = typeof docVersions[number];
export interface Page {
  title: string;
  href: string;
  githubHref?: string;
}

export interface Section {
  title: string;
  links: Page[];
}

export type VersionedDocsNavigation = Section[];

export type DocsNavigation = Record<DocVersions, VersionedDocsNavigation>;
