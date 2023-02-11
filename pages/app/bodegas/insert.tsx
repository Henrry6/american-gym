import axios from 'axios'
import $rules from '@/assets/rules'
import { User } from '@/types/User'
import { useRouter } from 'next/router'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message
} from 'antd'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()

  const onSubmit = (data: User) => {
    console.log(data)
    if (router.query.id) {
      axios.put(`/api/warehouses/${router.query.id}`, data)
      message.success('Documento actualizado')
    } else {
      axios.post('/api/warehouses', data)
      message.success('Documento guardado correctamente')
    }
    router.push('/app/bodegas')
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-2 gap-x-6'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <div className={cssColumnas}>
        <Form.Item
          name="code"
          label="Código"
          rules={[$rules.required()]}
        >
          <Input placeholder="Ingrese el código" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Nombre"
          rules={[$rules.min(3)]}
        >
          <Input placeholder="Ingrese el nombre" />
        </Form.Item>

        <Form.Item
          name="dimension"
          label="Dimensión (m3)"
        >
          <InputNumber placeholder="Ingrese el tamaño de la bodega en metros" />
        </Form.Item>
      </div>
      
      <Button type="primary" className=" bg-blue-400" htmlType="submit">
        Guardar
      </Button>
      <Button className="ml-3" onClick={() => router.push('/app/bodegas')}>
        Cancelar
      </Button>
    </Form>
  )
}
