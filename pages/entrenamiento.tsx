import axios from 'axios'
import { Image, Typography } from 'antd'
import { PageSEO } from '@/components/SEO'
import { useEffect, useState } from 'react'

export default function Entrenamiento() {
  const [users, setusers] = useState<any[]>([])

  useEffect(() => {
    // axios.get('https://henrry-api.herokuapp.com/users').then(({ data }) => {
    axios.get('/api/users').then(({ data }) => {
      console.log(data)
      setusers(data)
    })
  }, [])
  return (
    <>
      <PageSEO title="Entrenamientos" description="Things I blog about" />
      <div className="flex flex-col items-center">
        <Typography.Title level={3} className="dark:text-white">
          Entrenamientos
        </Typography.Title>
      </div>
      {JSON.stringify(users)}
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
