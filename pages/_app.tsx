import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Passion_One } from '@next/font/google';

const logoFont = Passion_One({
  weight: '400',
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
        `}
      </style>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
