import { FC } from 'react'
import { Image } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { Timeline, Typography } from 'antd'

const Beneficios: FC = () => {
  const Item: FC<{ title: string; description: string }> = (props: {
    title: string
    description: string
  }) => (
    <Timeline.Item>
      <span className="text-base">
        <b>{props.title}</b>: {props.description}
      </span>
    </Timeline.Item>
  )
  return (
    <>
      <Head>
        <title>Beneficios</title>
      </Head>
      <div className="px-8 text-justify sm:px-28 xl:px-96 ">
        <Typography.Title className="text-center dark:text-white" level={3}>
          Beneficios de ir al gym
        </Typography.Title>
        <p className="text-base">
          Hacer deporte es una de las actividades que cualquier persona debería
          hacer regularmente a lo largo de su vida. Y aunque es algo más que
          obvio, recomendado por médicos y distintos especialistas en salud, no
          todo el mundo lo tiene tan claro. O encuentra la motivación para dar
          el salto. Por eso hoy te vamos a dar 10 beneficios o razones para que
          no te lo pienses más, y vayas corriendo a apuntarte a nuestro
          gimnasio.
        </p>
        <div className="mt-4 flex justify-center">
          <Image.PreviewGroup>
            <Image width={200} alt="prensa" src="/static/prensa.jpeg" />
            <Image
              width={200}
              alt="feeds"
              src="/static/dibujo.jpeg"
              className=" ml-4"
            />
            <Image
              width={200}
              alt="feeds"
              src="/static/all-gym.jpeg"
              className="ml-8"
            />
          </Image.PreviewGroup>
        </div>
        <Typography.Title level={4} className="font mt-6 dark:text-white">
          RAZONES PARA IR AL GIMNASIO:
        </Typography.Title>
        <Timeline className="mt-6 font-sans dark:text-white">
          <Item
            title="Mejora la coordinación"
            description="Una buena coordinación te servirá en tu vida
        diaria para ser menos torpe, estar más activo, incluso moverte mejor y
        posicionar mejor tu cuerpo. Lo que te ayudará por ejemplo en las
        actividades domésticas a que no te carguen tanto la musculatura, entre
        otras ventajas."
          />
          <Item
            title="Fuerza y resistencia"
            description=" Entrenar en el gimnasio
            desarrollará tus músculos, dándote más fuerza y, por supuesto,
            brindándote de una mayor resistencia ante esfuerzos de todo tipo."
          />
          <Item
            title="Más flexibilidad"
            description=" Entrenar en el gimnasio
            desarrollará tus músculos, dándote más fuerza y, por supuesto,
            brindándote de una mayor resistencia ante esfuerzos de todo tipo."
          />
          <Item
            title="Trabaja la concentración"
            description="Estar concentrado es esencial en el gimnasio, pues uno debe marcarse una
            rutina, llevar los tiempos de descanso adecuados, así como las
            repeticiones y una buena ejecución del ejercicio. Un buen entrenamiento
            requiere alta concentración, y además de entrenar nuestro físico,
            también lo hacemos con nuestra mente."
          />
          <Item
            title="Mejorará tu alimentación"
            description="Conforme vayas alimentando tu motivación en el
            gimnasio, irás descubriendo que para un mejor rendimiento, necesitas una
            correcta alimentación. En el gimnasio existen profesionales cualificados
            que te ayudarán a llevar una dieta adecuada, de la cual aprenderás
            muchísimos sobre nutrientes, alimentos y demás. "
          />
          <Item
            title="Disminuye el riesgo de
            enfermedades cardiovasculares"
            description="Hacer deporte entrena el corazón para
            esfuerzos físicos, por lo que todo tipo de enfermedad relacionada
            (cardiovascular etc..) son más difíciles de atacar en un cuerpo
            entrenado y sano."
          />
          <Item
            title="Solución contra el estrés"
            description="El esfuerzo físico provoca
            que nuestro cuerpo produzca una serie de sustancias que nos hacen tener
            la mente mas distentida. De hecho, se llega a alcanzar un estado de
            relajación dentro del esfuerzo moderado."
          />
          <Item
            title="Mejora tu figura, aumenta tu autoestima"
            description="En primer lugar, determinar una
            serie de metas u objetivos a conseguir, te ayudarán a mejorar tu
            autoestima. Te darás cuenta de que puedes conseguir cualquier cosa que
            te propongas gracias a tu esfuerzo y entrega. Y como consecuencia de
            todo este entrenamiento, tu cuerpo mostrará un mejor aspecto: músculos,
            tonificación.."
          />
          <Item
            title="Disciplina"
            description="La disciplina te hará ganar unos buenos hábitos para tu vida
            diaria. Marcarte objetivos, rutinas, organización.. Te vendrán fenomenal
            para tu vida diaria."
          />
          <Item
            title="Harás amigos, el gimnasio será una familia"
            description="En el
            gym conocerás a otras personas con las que conectarás más o menos. Pero
            en el entrenamiento y esfuerzo diario, harás grandes amistades,
            entrenarás con grupos, por parejas, os ayudaréis los unos a los otros..
            El gimnasio se convertirá en una familia para ti. En una especia de club
            social que te alegrará el alma."
          />
        </Timeline>
        <div>
          <div>
            Por ahora estas son todas la razones que te vamos a dar para que
            veas todas las ventajas que tiene ir a un gimnasio. Aunque hay
            muchas más que te invitamos a descubrir por ti mismo. Si te animas,
            infórmate en nuestra sección de{' '}
            <Link href="/contactos" className="text-blue-700">
              contacto
            </Link>
          </div>
          {/* <Link href="/contactos" passHref>
            <Typography.Link className="text-base">contacto.</Typography.Link>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default Beneficios
