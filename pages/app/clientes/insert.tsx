import $rules from '@/assets/rules'
import { useRouter } from 'next/router'
import { Button, Form, Input, message } from 'antd'
import { useEffect } from 'react'
import axios from 'axios'
import configs from '@/assets/configs'
import { Users } from '@/types/Users'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(`${configs.hostApi}/users/${router.query.id}`)
        .then(({ data }) => {
          form.setFieldsValue(data)
        })
    }
  }, [router.query.id])

  const onSubmit = (data: Users) => {
    if (router.query.id) {
      axios.put(`${configs.hostApi}/users/${router.query.id}`, data)
      message.success('Documento actualizado')
    } else {
      axios.post(`${configs.hostApi}/users`, data)
      message.success('Documento guardado correctamente')
    }
    router.push('/app/clientes')
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-2 gap-x-6'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <div className={cssColumnas}>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[$rules.required()]}
          normalize={(text: string) => text.toUpperCase()}
        >
          <Input placeholder="Ingrese la razón social" />
        </Form.Item>

        <Form.Item name="username" label="Usuario" rules={[$rules.required()]}>
          <Input placeholder="Ingrese el usuario" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[$rules.required()]}
        >
          <Input placeholder="Ingrese la contraseña" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[$rules.required()]}>
          <Input placeholder="Ingrese el correo" />
        </Form.Item>
        <Form.Item name="cellphone" label="Celular" rules={[$rules.required()]}>
          <Input placeholder="Ingrese el número de teléfono" />
        </Form.Item>
        <Form.Item name="city" label="Ciudad" rules={[$rules.required()]}>
          <Input placeholder="Ingrese la ciudad" />
        </Form.Item>
      </div>

      <Button type="primary" className=" bg-blue-400" htmlType="submit">
        Guardar
      </Button>
      <Button className="ml-3" onClick={() => router.push('/app/clientes')}>
        Cancelar
      </Button>
    </Form>
  )
}
