import Link from './Link'
import Footer from './Footer'
import Logo from '@/data/logo-gym-85px.svg'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import SectionContainer from './SectionContainer'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <header className="flex items-center justify-between px-2 pt-2">
        <div>
          {/* logo y nombre */}
          <Link href="/" aria-label={siteMetadata.headerTitle}>
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
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 dark:text-gray-100 dark:hover:text-red-700 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
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
