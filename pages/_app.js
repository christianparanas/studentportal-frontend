import Head from "next/head";

import '../styles/globals.scss'
import '../styles/nav.scss'
import '../styles/dashboard.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@bf7775b/css/all.css" rel="stylesheet" type="text/css" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
