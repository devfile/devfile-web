# registry-viewer

Registry viewer project for [registry.devfile.io](https://registry.devfile.io/).

## Additional commands

- `yarn nx postexport registry-viewer`: exports the website's sitemap

## Environment Variables

For more information regarding `NEXT_PUBLIC_*` environment variables click [here](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).

A few notes:

- `NEXT_PUBLIC_*` environment variables are dynamic client side only
- Non `NEXT_PUBLIC_*` environment variables are dynamic server side only
- If you need a dynamic environment variable server side and client side, you will need to pass the environment variable as a prop through `getStaticProps()`.

- `NEXT_PUBLIC_ANALYTICS_WRITE_KEY`: The Segment analytics write key
- `SITE_URL`: The production url the site is hosted on (used to generate the sitemap)
- `DEVFILE_REGISTRIES`: A JSON string array of the devfile registries to point the registry viewer at
  - `name`: The name of the devfile registry
  - `url`: The url of the devfile registry
  - `fqdn` (optional): The fqdn of the devfile registry in case the devfile registry is hosted locally (NOTE: local links will not work if `fqdn` is not set, i.e. links will be set to localhost instead of the correct url)
  - e.g. `DEVFILE_REGISTRIES=[{"name":"Community","url":"http://localhost:4200/","fqdn":"https://registry.stage.devfile.io"},{"name":"Devfile Registry","url":"https://registry.stage.devfile.io"}]`
