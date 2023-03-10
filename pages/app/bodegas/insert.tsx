import axios from 'axios'
import { useEffect } from 'react'
import $rules from '@/assets/rules'
import { useRouter } from 'next/router'
import { Cellar } from '@/types/Cellars'
import { showError } from '@/assets/utils'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Typography,
} from 'antd'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()

  useEffect(() => {
    if (router.query.id) {
      axios.get(`/api/cellars/${router.query.id}`).then(({ data }) => {
        form.setFieldsValue(data)
      })
    }
  }, [router.query.id, form])

  const onSubmit = (data: Cellar) => {
    try {
      if (router.query.id) {
        axios.put(`/api/cellars/${router.query.id}`, data)
        message.success('Documento actualizado')
      } else {
        axios.post('/api/cellars', data)
        message.success('Documento guardado correctamente')
      }
      router.push('/app/bodegas')
    } catch (err) {
      showError(err)
    }
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-3 gap-x-6'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Card>
        <Typography.Title level={4}>Datos</Typography.Title>
        <div className={cssColumnas}>
          <Form.Item name="code" label="Código" rules={[$rules.required()]}>
            <Input placeholder="Ingrese el código" />
          </Form.Item>

          <Form.Item name="name" label="Nombre" rules={[$rules.required()]}>
            <Input placeholder="Ingrese el nombre" />
          </Form.Item>

          <Form.Item
            name="dimension"
            label="Dimensión (m3)"
            rules={[$rules.required()]}
          >
            <InputNumber
              className="w-full"
              placeholder="Ingrese el tamaño de la bodega en metros"
              min={1}
            />
          </Form.Item>

          <Form.Item
            name="addres"
            label="Dirección"
            rules={[$rules.required()]}
          >
            <Input placeholder="Ingrese una dirección" />
          </Form.Item>
        </div>
      </Card>
      {/* <Card className="mt-4">
        <Typography.Title level={4}>Dirección</Typography.Title>
        <div className={cssColumnas}>
          <Form.Item
            name={['address', 'city']}
            label="Ciudad"
            rules={[$rules.required()]}
          >
            <Input placeholder="Ingrese la ciudad" />
          </Form.Item>
          <Form.Item name={['address', 'parish']} label="Parroquia">
            <Input placeholder="Ingrese la parroquia" />
          </Form.Item>
          <Form.Item name={['address', 'sector']} label="Sector">
            <Input placeholder="Ingrese el sector" />
          </Form.Item>
          <Form.Item name={['address', 'neighborhood']} label="Barrio">
            <Input placeholder="Ingrese el el barrio" />
          </Form.Item>
          <Form.Item name={['address', 'main_street']} label="Calle principal">
            <Input placeholder="Ingrese la calle principal" />
          </Form.Item>
          <Form.Item name={['address', 'back_street']} label="Calle secundaria">
            <Input placeholder="Ingrese la calle secundaria" />
          </Form.Item>
          <Form.Item name={['address', 'house_number']} label="Nº de casa">
            <Input placeholder="Ingrese el número de cada" />
          </Form.Item>
          <Form.Item name={['address', 'reference']} label="Referencia">
            <Input placeholder="Ingrese una referencia" />
          </Form.Item>
        </div>
      </Card> */}
      <Space className="mt-4 flex justify-end mr-4">
        <Button type="primary" className=" bg-blue-400" htmlType="submit">
          Guardar
        </Button>
        <Button className="ml-3" onClick={() => router.push('/app/bodegas')}>
          Cancelar
        </Button>
      </Space>
    </Form>
  )
}
