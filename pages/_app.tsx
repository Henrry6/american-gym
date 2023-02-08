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
