import Link from 'next/link'
import Head from 'next/head'
import { Typography } from 'antd'
import siteMetadata from '@/data/siteMetadata'
import { ArrowRightOutlined } from '@ant-design/icons'

export default function Home() {
  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className="mx-6 my-3 grid sm:grid-cols-1 md:grid-cols-2 m-3">
        <div className="flex justify-center">
          <img
            src="/static/portada.jpg"
            width={1500}
            alt="x"
            className="dark:opacity-70"
          />
        </div>
        <div className="ml-4 flex items-center justify-center ">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
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
        className="flex items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/static/fondo1.jpg')`,
          backgroundPosition: '100% 40%',
          height: '600px',
        }}
      >
        <div className="flex w-4/5 justify-end">
          <div className="w-[573px] border-t-8 border-t-red-600 bg-white py-6 px-8 leading-8 md:px-10 md:py-10">
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
              <Link
                href="/beneficios"
                passHref
                className="flex items-center text-lg text-blue-700"
              >
                <span className="mr-3">Ver</span> <ArrowRightOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 my-3 grid sm:grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center">
          <img width={450} alt="feeds" src="/static/dibujo.jpeg" />
        </div>
        <div className="flex items-center">
          <div className="ml-4 flex py-3 md:py-8 md:pr-10">
            <div className="w-full space-y-2 border-t-8 border-t-red-600  bg-white p-6 leading-8 shadow sm:w-full md:space-y-5 xl:w-2/3 ">
              <Typography.Title level={4}>
                Máquinas en excelente estado
              </Typography.Title>

              <p className="mb-3 text-justify dark:text-gray-900">
                Contamos con varias máquinas nuevas para trabajar todas las
                partes de nuestro cuerpo, tanto la parte superior como para
                inferior. Set de mancuernas con varios pesos, steps, pesas
                rusas, bicicletas estáticas entre otras. Te invitamos a conocer
                más sobre como son los entrenamientos y nuestras máquinas.
              </p>
              <Link
                href="/entrenamiento"
                passHref
                className="flex items-center text-lg text-blue-700"
              >
                <span className="mr-3">Ver</span> <ArrowRightOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-6 my-3 grid sm:grid-cols-1 md:grid-cols-2">
        <div className="flex items-center">
          <div className="ml-4 flex py-3 md:py-8 md:pr-10">
            <div className="w-full space-y-2 border-t-8 border-t-red-600  bg-white p-6 leading-8 shadow sm:w-full md:space-y-5 xl:w-2/3 ">
              <Typography.Title level={2}>
                Entrenamiento personalizado
              </Typography.Title>

              <p className="mb-3 text-justify dark:text-gray-900">
                Es un profesional que se dedica al entrenamiento individualizado
                para personas que necesiten mejorar su condición física general
                o específica, para conseguir objetivos que van desde la salud
                hasta el alto rendimiento. Contamos con entrenadores
                certificados.
              </p>
              <Link
                href="/entrenamiento"
                passHref
                className="flex items-center text-lg text-blue-700"
              >
                <span className="mr-3">Ver</span> <ArrowRightOutlined />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img width={800} alt="feeds" src="/static/personal.jpg" />
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/static/free.jpg')`,
          backgroundPosition: '100% 40%',
          height: '500px',
        }}
      >
        <div className="flex w-4/5 ">
          <div className="w-[573px] border-t-8 border-t-red-600 bg-white py-6 px-8 leading-8 md:px-10 md:py-10">
            <div>
              <Typography.Title level={4}>
                Entrena con nosotros
              </Typography.Title>

              <p className="mb-3 text-justify dark:text-gray-900">
                Hacer deporte es una de las actividades que cualquier persona
                debería hacer regularmente a lo largo de su vida. Y aunque es
                algo más que obvio, recomendado por médicos y distintos
                especialistas en salud, no todo el mundo lo tiene tan claro.
              </p>
              <Link
                href="/contactos"
                passHref
                className="flex items-center text-lg text-blue-700"
              >
                <span className="mr-3">Ver</span> <ArrowRightOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
