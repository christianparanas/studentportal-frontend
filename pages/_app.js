import Head from "next/head";

import '../styles/login.scss'
import '../styles/globals.scss'
import '../styles/nav.scss'
import '../styles/dashboard.scss'
import '../styles/subjects.scss'
import '../styles/grades.scss'

import { DashContext } from '../contexts/DashContext.js'

import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [dashItems, setDashItems] = useState([])
  const [isAuth, setIsAuth] = useState(false)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@bf7775b/css/all.css" rel="stylesheet" type="text/css" />
      </Head>

      <DashContext.Provider value={{ dashItems, setDashItems, isAuth, setIsAuth }}>
        <Component {...pageProps} />
      </DashContext.Provider>
    </>
  )
}

export default MyApp
