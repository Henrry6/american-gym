import { Image, Typography } from 'antd'
import { PageSEO } from '@/components/SEO'

export default function Entrenamiento() {
  return (
    <>
      <PageSEO title="Entrenamientos" description="Things I blog about" />
      <div className="flex flex-col items-center">
        <Typography.Title level={3} className="dark:text-white">
          Entrenamientos
        </Typography.Title>
      </div>
      <div className="mt-4 flex justify-center">
        <Image.PreviewGroup>
          <Image width={200} alt="prensa" src="/static/piernas.jpeg" />
          <Image
            width={200}
            alt="feeds"
            src="/static/brazos.jpeg"
            className=" ml-4"
          />
          <Image
            width={200}
            alt="feeds"
            src="/static/gluteos.jpeg"
            className="ml-8"
          />
        </Image.PreviewGroup>
      </div>
    </>
  )
}
