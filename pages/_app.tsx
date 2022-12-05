import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Fira_Code, Passion_One } from '@next/font/google';

const logoFont = Passion_One({
  weight: '400',
  subsets: ['latin'],
});

const codeFont = Fira_Code({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <style jsx global>
        {`
          .logo {
            font-family: ${logoFont.style.fontFamily} !important;
          }

          code {
            font-family: ${codeFont.style.fontFamily}, monospace;
          }
        `}
      </style>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
