import { Image } from 'antd'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NewsletterForm from '@/components/NewsletterForm'

export default function About() {
  return (
    <>
      <Head>
        <title>Contactos</title>
      </Head>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="ml-4 space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Contactos
          </h1>
        </div>
        <div className="flex flex-col items-center sm:flex-row">
          <div className="flex w-1/3 flex-col items-center pt-8">
            <Image
              src="/static/images/logo-gym.png"
              alt="avatar"
              width="250px"
              height="350px"
              className="rounded-3xl"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {siteMetadata.title}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Gimnasio</div>
            <div className="text-gray-500 dark:text-gray-400">
              Quito - Ecuador
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:princedark393@gmail.com`} />
              <SocialIcon kind="github" href="https://github.com" />
              <SocialIcon kind="twitter" href="https://twitter.com/Twitter" />
            </div>
          </div>
          <div className="w-2/3 pt-8 text-justify leading-8 sm:px-16">
            Un gimnasio (conocido asimismo con el anglicismo gym) es un lugar
            que permite practicar deportes o hacer ejercicio en un recinto
            cerrado con varias máquinas y artículos deportivos a disposición de
            quienes lo visiten. En los últimos años, el número de gimnasios ha
            aumentado considerablemente como respuesta al incremento en la
            demanda de servicios deportivos. Esta circunstancia ha provocado un
            creciente interés por parte de la población en servicios deportivos.
            Actualmente, los gimnasios son instalaciones deportivas de
            referencia para la promoción del deporte entre la población.
            <p className="my-4">
              Los resultados y objetivos esperados para cada persona pueden ser
              muy diferentes, es por eso que tener un plan adaptado para ti es
              muy importante:
            </p>
            <ul className="ml-12   list-disc">
              <li>Aumentar la confianza en uno mismo para sentirse mejor.</li>
              <li>Mejorar la motricidad y la coordinación.</li>
              <li>Tonificar y ganar musculatura.</li>
              <li>Perder peso.</li>
              <li>Mejorar la salud.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-4">
        <NewsletterForm />
      </div>
    </>
  )
}
