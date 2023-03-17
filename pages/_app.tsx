import '@/css/tailwind.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import LayoutApp from '@/layouts/LayoutAnt'
import { ThemeProvider } from 'next-themes'
import '@fontsource/inter/variable-full.css'
import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="robots" content="follow, index" />
          <meta name="description" content={siteMetadata.description} />
          <meta
            property="og:url"
            content={`${siteMetadata.siteUrl}${router.asPath}`}
          />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content={siteMetadata.title} />
          <meta property="og:title" content={siteMetadata.title} />
          <meta property="og:description" content={siteMetadata.description} />
          <meta
            property="og:image"
            content={siteMetadata.siteLogo}
            key="logo"
          />
          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={siteMetadata.twitter} />
          <meta name="twitter:title" content={siteMetadata.title} />
          <meta name="twitter:description" content={siteMetadata.description} />
          <meta name="twitter:image" content={siteMetadata.siteLogo} /> */}
        </Head>
        {router.pathname === '/login' ? (
          <div className="my-48 w-auto	">
            <Component {...pageProps} />
          </div>
        ) : router.pathname.startsWith('/app') ||
          router.pathname.includes('/404') ? (
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
