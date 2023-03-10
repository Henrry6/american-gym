import axios from 'axios'
import { useEffect } from 'react'
import $rules from '@/assets/rules'
import { User } from '@/types/User'
import { useRouter } from 'next/router'
import { showError } from '@/assets/utils'
import { Button, Card, Form, Input, message, Select, Space } from 'antd'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()

  useEffect(() => {
    if (router.query.id) {
      axios.get(`/api/clients/${router.query.id}`).then(({ data }) => {
        form.setFieldsValue(data)
      })
    }
  }, [router.query.id])

  const onSubmit = async (data: User) => {
    try {
      if (router.query.id) {
        await axios.put(`/api/clients/${router.query.id}`, data)
        message.success('Documento actualizado')
      } else {
        await axios.post('/api/clients', data)
        message.success('Documento guardado correctamente')
      }
      router.push('/app/clientes')
    } catch (e) {
      showError(e)
    }
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-3 gap-x-6'

  return (
    <Form
      form={form}
      initialValues={{ state: 'activo' }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Card>
        <div className={cssColumnas}>
          <Form.Item
            name="identification_card"
            label="No. Identificación"
            rules={[$rules.required()]}
          >
            <Input placeholder="Ingrese su cédula/Ruc" />
          </Form.Item>

          <Form.Item name="name" label="Nombre" rules={[$rules.required()]}>
            <Input placeholder="Ingrese el nombre" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Apellido"
            rules={[$rules.required()]}
          >
            <Input placeholder="Ingrese el apellido" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[$rules.required()]}>
            <Input placeholder="Ingrese el correo" />
          </Form.Item>
          <Form.Item name="phone" label="Celular">
            <Input placeholder="Ingrese el número de teléfono" />
          </Form.Item>
          <Form.Item name="state" label="Estado">
            <Select placeholder="Seleccione una de las opciones">
              <Select.Option value="activo">Activo</Select.Option>
              <Select.Option value="inactivo">Inactivo</Select.Option>
            </Select>
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
        <Button className="ml-3" onClick={() => router.push('/app/clientes')}>
          Cancelar
        </Button>
      </Space>
    </Form>
  )
}
