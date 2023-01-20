import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

// import { AppProps } from 'next/app'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
// import { PropsWithChildren } from 'react'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </div>
  )
}