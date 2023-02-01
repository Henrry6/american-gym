import axios from 'axios'
import { useEffect } from 'react'
import $rules from '@/assets/rules'
import { User } from '@/types/User'
import { useRouter } from 'next/router'
import { Button, Form, Input, message } from 'antd'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()

  useEffect(() => {
    if (router.query.id) {
      axios.get(`/api/users/${router.query.id}`).then(({ data }) => {
        form.setFieldsValue(data)
      })
    }
  }, [router.query.id])

  const onSubmit = (data: User) => {
    if (router.query.id) {
      axios.put(`/api/users/${router.query.id}`, data)
      message.success('Documento actualizado')
    } else {
      axios.post('/api/users', data)
      message.success('Documento guardado correctamente')
    }
    router.push('/app/clientes')
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-2 gap-x-6'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <div className={cssColumnas}>
        <Form.Item name="name" label="Nombre" rules={[$rules.required()]}>
          <Input placeholder="Ingrese la razón social" />
        </Form.Item>
        <Form.Item
          name="id"
          label="No. Identificación"
          rules={[$rules.required()]}
        >
          <Input placeholder="Ingrese su cédula/Ruc" />
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
        <Form.Item name="cellphone" label="Celular">
          <Input placeholder="Ingrese el número de teléfono" />
        </Form.Item>
        <Form.Item name="city" label="Ciudad">
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
