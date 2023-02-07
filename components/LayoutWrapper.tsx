import Footer from './Footer'
import MobileNav from './MobileNav'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import Logo from '@/data/logo-gym-85px.svg'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import SectionContainer from './SectionContainer'
import { UserOutlined } from '@ant-design/icons'

const LayoutWrapper = ({ children }: any) => {
  return (
    <>
      <header className="flex items-center justify-between px-2 pt-2">
        <div>
          {/* logo y nombre */}
          <Link href="/" aria-label={siteMetadata.headerTitle} passHref>
            <div className="flex items-center justify-between">
              <div className="mr-3">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          {/* items menu */}
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <a key={link.title} href={link.href}>
                <span className="p-1 font-medium text-gray-900 hover:text-red-700 dark:text-gray-100 dark:hover:text-red-700 sm:p-4">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
          <ThemeSwitch />
          <a
            href={'/login'}
            className="ml-4 flex items-center gap-1 underline underline-offset-4"
          >
            <UserOutlined title="Editar" /> Log in
          </a>
          <MobileNav />
        </div>
      </header>
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
