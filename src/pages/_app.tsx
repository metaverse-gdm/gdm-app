import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../i18n';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
