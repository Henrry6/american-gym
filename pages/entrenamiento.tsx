import axios from 'axios'
import Head from 'next/head'
import { Image, Typography } from 'antd'
import { useEffect, useState } from 'react'

export default function Entrenamiento() {
  const [users, setusers] = useState<any[]>([])

  useEffect(() => {
    axios.get('/api/users').then(({ data }) => {
      setusers(data)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Entrenamientos</title>
      </Head>
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
