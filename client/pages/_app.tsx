import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Fira_Code, Passion_One } from "@next/font/google";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from "chart.js";
import Script from "next/script";

const logoFont = Passion_One({
  weight: "400",
  subsets: ["latin"],
});

const codeFont = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="/script.js" />
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
    </>
  );
}
