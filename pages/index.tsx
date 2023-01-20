import Image from 'next/image'
import { Typography } from 'antd'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { ArrowRightOutlined } from '@ant-design/icons'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="mx-6 my-3 grid sm:grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center">
          <Image
            src="/static/portada.jpg"
            width={1500}
            height={972}
            alt="x"
            className="dark:opacity-70"
          />
        </div>
        <div className="ml-4 flex items-center justify-center ">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
            <h1 className="text-center text-2xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
              American Gym <br /> entrena diferente! 💪
            </h1>
            <p className="flex justify-center text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
        </div>
      </div>
      <div
        className=" flex w-screen items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/static/fondo1.jpg')`,
          backgroundPosition: '100% 40%',
          height: '600px',
        }}
      >
        <div className="flex w-4/5 justify-end">
          <div className="w-[573px] border-t-8 border-t-red-600 bg-white py-12 px-10 leading-8 md:px-[84px] md:py-[72px]">
            <div>
              <Typography.Title level={4}>
                Beneficios de ir al gym
              </Typography.Title>

              <p className="mb-3 text-justify dark:text-gray-900">
                Hacer deporte es una de las actividades que cualquier persona
                debería hacer regularmente a lo largo de su vida. Y aunque es
                algo más que obvio, recomendado por médicos y distintos
                especialistas en salud, no todo el mundo lo tiene tan claro.
              </p>
              <Link href="/beneficios" passHref>
                <Typography.Link className="flex items-center text-lg">
                  <span className="mr-3">Ver</span> <ArrowRightOutlined />
                </Typography.Link>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
