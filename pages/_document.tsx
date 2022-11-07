import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Voterr App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='bg-gray-600 text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
