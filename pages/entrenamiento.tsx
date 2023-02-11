import axios from 'axios'
import Head from 'next/head'
import { Image, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'

export default function Entrenamiento() {
  const [users, setusers] = useState<unknown[]>([])

  useEffect(() => {
    axios.get('/api/users').then(({ data }) => {
      setusers(data)
    })
  }, [])

  const ImageRoud: FC<{ url: string; title: string }> = ({ url, title }) => {
    return (
      <div className="text-center flex flex-col items-center">
        <img
          src={url}
          width={150}
          alt="x"
          style={{ borderRadius: '50%', height: '150px' }}
        />
        <Typography.Title level={5}>{title}</Typography.Title>
      </div>
    )
  }
  const Ejercicio: FC<{ url: string; title: string; description: string }> = ({
    url,
    title,
    description,
  }) => {
    return (
      <div className="text-center flex flex-col items-center">
        <Typography.Title level={5}>{title}</Typography.Title>
        <img
          src={url}
          width={300}
          alt="x"
          style={{
            borderRadius: '10%',
            height: '270px',
            objectFit: 'cover',
          }}
        />
        <div className="w-[300px] text-justify">
          <Typography.Text>{description}</Typography.Text>
        </div>
      </div>
    )
  }

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
      <div className="flex justify-center gap-10 mt-5 md:flex-row flex-col mb-5">
        <ImageRoud
          url="/static/entre.jpg"
          title="Entrenamiento personalizado"
        />
        <ImageRoud
          url="/static/tecnica1.jpg"
          title="Técnica de levantamiento"
        />
        <ImageRoud url="/static/asesoria.png" title="Asesoria profesional" />
        <ImageRoud
          url="/static/cardio.jpg"
          title="Ejercicios cardiovasculares"
        />
      </div>
      <Typography.Title level={2}>Parte superior</Typography.Title>
      <div className=" mt-4 grid grid-cols-4">
        <Ejercicio
          url="/Ejercicios/pecho.png"
          title="Pectorales"
          description="Los músculos pectorales son los músculos que conectan la parte delantera del pecho humano con los huesos de la parte superior del brazo y el hombro."
        />
        <Ejercicio
          url="/Ejercicios/espalda.jpg"
          title="Espalda"
          description="La espalda es una parte fundamental de nuestro cuerpo y se conforma de diversos músculos, algunos más pequeños y otros de mayor volumen, pero todos de gran relevancia para el organismo."
        />
        <Ejercicio
          url="/Ejercicios/hombros.jpg"
          title="Hombros"
          description="Los hombros proporcionan belleza, simetría y una correcta posición que embellece el tren superior. Además, los hombros están implicados en muchos de los movimientos que realizamos durante el día, por lo que cuidarlos es de vital importancia."
        />
        <Ejercicio
          url="/Ejercicios/biceps.jpg"
          title="Biceps"
          description="Desarrollo de la musculatura del bíceps Es un buen mecanismo de defensa ante una caída o un accidente en el brazo. Además, fortalecen los huesos y ayudan a que estén sanos, en caso de lesión, hará que se recuperen antes.Un estudio reciente concluye que trabajar tus bíceps, entre otros ejercicios, favorece tu salud cardiovascular y refuerza tu corazón."
        />
        <Ejercicio
          url="/Ejercicios/triceps.jpg"
          title="Triceps"
          description="El tríceps comienza desde la altura de la articulación del codo, extendiéndose sobre el hombro en la parte posterior del brazo, por lo que al ejercitarlos te ayudan a tener una mejor imagen y además te aportan un mayor rendimiento deportivo al entrenar."
        />
        <Ejercicio
          url="/Ejercicios/antebrazos.jpg"
          title="Antebrazos"
          description="El entrenamiento de los antebrazos, muñecas y manos en todas sus variantes y movimientos te ayudará a mejorar tu agarre, reducir la tensión del codo y la muñeca y aumentar tu flexibilidad y destreza."
        />
        <Ejercicio
          url="/Ejercicios/abdomen.jpg"
          title="Abdomen"
          description="Tener los abdominales bien definidos y desarrollados, benefician los músculos de la espalda al mover el tronco, te ayuda a tener una posición vertical adecuada y correcta y por supuesto fortalece la zona pélvica, reduce la ansiedad y evita los molestos dolores de espalda."
        />
      </div>
    </>
  )
}
