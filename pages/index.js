import Image from 'next/image'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
// import Logo from '@/data/logo-gym-85px.svg'
// import Logo from '@/public/static/images/logo-gym-85px.svg'

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="mt-6 grid grid-cols-2">
        <div className="flex justify-center">
          <Image
            src="/static/portada.jpg"
            width={1500}
            height={972}
            alt="x"
            className="opacity-60 dark:opacity-70 md:opacity-100"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
              American Gym entrena diferente
            </h1>
            <p className="flex justify-center text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
        </div>
      </div>
      {/* <div
        className="bg-scroll"
        style={{
          backgroundImage: `url('/static/portada.jpg')`,
          height: '972px',
          width: '2000px',
        }}
      ></div> */}
    </>
  )
}
