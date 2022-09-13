export interface DevfileJson {
  name: string;
  version?: string;
  displayName: string;
  description?: string;
  type: string;
  tags?: string[];
  icon?: string;
  projectType: string;
  provider?: string;
  language: string;
  links?: {
    self: string;
  };
  resources?: string[];
  starterProjects?: string[];
  git?: {
    remotes: {
      [key: string]: string;
    };
  };
}

export interface DevfileRegistry {
  name: string;
  link: string;
}

export interface Devfile extends DevfileJson {
  devfileRegistry: {
    name: string;
    link: string;
  };
}

export async function fetchDevfiles(devfileRegistries: DevfileRegistry[]): Promise<Devfile[]> {
  const responses = await Promise.all(
    devfileRegistries.map((devfileRegistry) =>
      fetch(`${devfileRegistry.link}/index/all?icon=base64`),
    ),
  );

  responses.forEach((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  });

  const devfileJsons: DevfileJson[][] = await Promise.all(
    responses.map((r) => (r.json() as Promise<DevfileJson[]>) ?? []),
  );

  const devfiles: Devfile[] = devfileRegistries
    .flatMap((devfileRegistry, devfileRegistryIndex) =>
      devfileJsons[devfileRegistryIndex].map((devfile) => ({
        ...devfile,
        devfileRegistry: {
          name: devfileRegistry.name,
          link: devfileRegistry.link,
        },
      })),
    )
    .sort((a, b) =>
      a.displayName.localeCompare(b.displayName, 'en', {
        sensitivity: 'accent',
      }),
    );

  return devfiles;
}

export default fetchDevfiles;
