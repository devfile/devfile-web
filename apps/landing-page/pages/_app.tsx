import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function LandingPage({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Welcome to site!</title>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
export default LandingPage;
