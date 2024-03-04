import { Html, Head, Main, NextScript } from 'next/document';

// https://nextjs.org/docs/advanced-features/custom-document

export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <script
        src="https://pub-5f67a9e3309c467cb31187bd157e7901.r2.dev/sponsors.js"
        defer
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}