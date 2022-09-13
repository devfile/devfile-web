export function parseDevfileLink(link: string): {
  pageNumber: number;
  search: string;
  registries: string[];
  tags: string[];
  types: string[];
  providers: string[];
  languages: string[];
} {
  const pageNumberMatch = link.match(/page=(\d+)/);
  const pageNumber = pageNumberMatch ? Number.parseInt(pageNumberMatch[1], 10) : 1;

  const searchMatch = link.match(/search=([^&]+)/);
  const search = searchMatch ? searchMatch[1] : '';

  const registriesMatch = link.match(/registries=([^&]+)/);
  const registries = registriesMatch ? registriesMatch[1].split(',') : [];

  const tagsMatch = link.match(/tags=([^&]+)/);
  const tags = tagsMatch ? tagsMatch[1].split(',') : [];

  const typesMatch = link.match(/types=([^&]+)/);
  const types = typesMatch ? typesMatch[1].split(',') : [];

  const providersMatch = link.match(/providers=([^&]+)/);
  const providers = providersMatch ? providersMatch[1].split(',') : [];

  const languagesMatch = link.match(/languages=([^&]+)/);
  const languages = languagesMatch ? languagesMatch[1].split(',') : [];

  return { pageNumber, search, registries, tags, types, providers, languages };
}

export default parseDevfileLink;
