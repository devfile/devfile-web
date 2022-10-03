import slugify from '@sindresorhus/slugify';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { devfileRegistries } from '../../../config';

export function Index(): JSX.Element {
  return <meta httpEquiv="refresh" content="0; url=/" />;
}

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = () => {
  const paths = Object.keys(devfileRegistries).map((devfileRegistry) => ({
    params: { 'devfile-registry': slugify(devfileRegistry) },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Index;
