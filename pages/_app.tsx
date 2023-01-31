import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import type { AppProps } from 'next/app'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import { useRouter } from 'next/router'
import LayoutApp from '@/components/layouts/LayoutAnt'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        {router.pathname === '/login' ? (
          <div className="my-48 w-auto	">
            <Component {...pageProps} />
          </div>
        ) : ['/app', '/404', '/_error'].includes(router.pathname) ? (
          <LayoutApp>
            <Component {...pageProps} />
          </LayoutApp>
        ) : (
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        )}
      </ThemeProvider>
    </div>
  )
}
