import Head from 'next/head'
// import Card from '@/components/Card'

// md 40%
// sm 75%

export default function Planes() {
  return (
    <>
      <Head>
        <title>Planes</title>
      </Head>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-4 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-3 md:text-4xl md:leading-3">
            Planes
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Showcase your projects with a hero image (16 x 9)
          </p>
        </div>
        {/* <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div> */}
      </div>
    </>
  )
}
