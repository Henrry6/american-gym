import axios from 'axios'
import dayjs from 'dayjs'
import $rules from '@/assets/rules'
import { debounce } from 'ts-debounce'
import $filtros from '@/assets/filtros'
import { useRouter } from 'next/router'
import { Product } from '@/types/Product'
import { Clients } from '@/types/Clients'
import { showError } from '@/assets/utils'
import { FC, useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  FormInstance,
  FormListFieldData,
  FormListOperation,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Typography,
} from 'antd'
const { TextArea } = Input

const addConcepto = () => ({
  product_id: '',
  description: '',
  amount: 1,
  unit_value: 0,
  discount: 0,
  importe: 0,
})

export const Conceptos: FC<{
  form: FormInstance
}> = (props) => {
  const [optionsProducts, setOptionsProducts] = useState<any[]>([])

  const detalles: ReturnType<typeof addConcepto>[] =
    Form.useWatch('details', props.form) || []

  useEffect(() => {
    if (detalles.length === 0) {
      props.form.setFieldValue('details', [addConcepto()])
    }
    axios.get('/api/products/').then(({ data }) => {
      const products = data.map((item: Product) => ({
        ...item,
        value: item._id,
        label: item.name,
      }))
      setOptionsProducts(products)
    })
  }, [])

  const getTablaDetalle = (
    fields: FormListFieldData[],
    operation: FormListOperation,
    form: FormInstance
  ) => {
    const updateTotals = debounce(() => {
      try {
        const details = form.getFieldValue('details')
        for (const detalle of details) {
          detalle.importe =
            detalle.amount * detalle.unit_value -
            (detalle.discount ? detalle.discount : 0)
        }
        form.setFieldValue('details', details)
      } catch (error) {
        console.warn('Calculo de totales:', error)
      }
    }, 300)

    const onSelectProduct = (
      value: string,
      val: Partial<Product> = {},
      index: number
    ) => {
      const name = ['details', index]
      const dataAnterior = form.getFieldValue(name)
      if (val) {
        Object.assign(dataAnterior, {
          product_id: val._id,
          code: val?.code,
          description: val.name,
          unit_value: val.price || 0,
        })
      }
      form.setFieldValue(name, dataAnterior)
      updateTotals()
    }

    return (
      <Table
        bordered
        dataSource={fields}
        rowClassName="align-top"
        pagination={false}
        className="mb-6"
      >
        <Table.Column
          key="product_id"
          title="Producto"
          render={({ name }) => (
            <Form.Item name={[name, 'product_id']} rules={[$rules.required()]}>
              <Select
                showSearch
                placeholder="Seleccione un producto"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={optionsProducts}
                onSelect={(val, option) => onSelectProduct(val, option, name)}
              />
            </Form.Item>
          )}
        />
        <Table.Column
          key="description"
          title="Descripción"
          render={({ name }) => (
            <Form.Item name={[name, 'description']} rules={[$rules.required()]}>
              <Input placeholder="Descripción del producto o servicio" />
            </Form.Item>
          )}
        />
        <Table.Column
          key="amount"
          title="Cantidad"
          render={({ name }) => (
            <Form.Item name={[name, 'amount']} rules={[$rules.required()]}>
              <InputNumber
                className="w-full"
                precision={2}
                min={0}
                placeholder="Ingrese la cantidad"
                onChange={() => updateTotals()}
              />
            </Form.Item>
          )}
        />
        <Table.Column
          key="unit_value"
          title="Valor u."
          render={({ name }) => (
            <Form.Item name={[name, 'unit_value']} rules={[$rules.required()]}>
              <InputNumber
                className="w-full"
                precision={2}
                min={0}
                placeholder="Ingrese el valor unitario"
                onChange={() => updateTotals()}
              />
            </Form.Item>
          )}
        />
        <Table.Column
          key="discount"
          title="Descuento"
          render={({ name }) => (
            <Form.Item name={[name, 'discount']}>
              <InputNumber
                className="w-full"
                precision={2}
                min={0}
                placeholder="Ingrese el descuento"
                onChange={() => updateTotals()}
              />
            </Form.Item>
          )}
        />
        <Table.Column
          key="importe"
          title="Importe"
          render={({ name }) => (
            <Form.Item name={[name, 'importe']} rules={[$rules.required()]}>
              <InputNumber
                className="w-full"
                disabled
                precision={2}
                min={0}
                placeholder="Ingrese el importe"
              />
            </Form.Item>
          )}
        />
        <Table.Column
          key="opciones"
          align="center"
          render={({ name }) => (
            <Popconfirm
              title="¿Eliminar detalle?"
              okButtonProps={{
                type: 'default',
              }}
              onConfirm={() => operation.remove(name)}
            >
              <DeleteOutlined title="Eliminar detalle" />
            </Popconfirm>
          )}
        />
      </Table>
    )
  }

  return (
    <>
      <Form.List name="details">
        {(fields, operation) => (
          <>
            <div className="flex justify-end mb-5">
              <Button
                type="link"
                onClick={() => {
                  operation.add(addConcepto())
                }}
              >
                Agregar
              </Button>
            </div>
            {(detalles || [])?.length === 0 ? (
              <Empty description="No hay detalles" />
            ) : (
              getTablaDetalle(fields, operation, props.form)
            )}
          </>
        )}
      </Form.List>
    </>
  )
}

const SalesNotes: FC = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [optionsClients, setOptionsClients] = useState<any[]>([])
  type TabsKeys = 'detalles'
  const [tabActiva, setTabActiva] = useState<TabsKeys>('detalles')
  const detalles = Form.useWatch('details', form) || []
  const subtotalF = Form.useWatch('subtotal', form)
  const total = Form.useWatch('total', form)
  const iva = Form.useWatch('iva', form)

  useEffect(() => {
    if (router.query.id) {
      axios.get(`/api/salesNotes/${router.query.id}`).then(({ data }) => {
        console.log(data.data)
        if (data.data.date) {
          data.data.date = dayjs(data.data.date)
        }
        if (data.data.cliente) {
          form.setFieldValue('client_id', data.data.cliente._id)
          form.setFieldValue('last_name', data.data.cliente.last_name)
          form.setFieldValue('email', data.data.cliente.email)
        }
        if (data.data.detalles) {
          const values: any = Object.values(data.data.detalles)
          for (const detail of values) {
            detail.amount = parseFloat(detail.amount)
            detail.discount = parseFloat(detail.discount)
            detail.importe = parseFloat(detail.importe)
            detail.unit_value = parseFloat(detail.unit_value)
          }
          form.setFieldValue('details', values)
        }

        form.setFieldsValue(data.data)
        console.log(form.getFieldsValue())
      })
    }
  }, [router.query.id, optionsClients])

  useEffect(() => {
    axios.get('/api/clients/').then(({ data }) => {
      const clients = data.map((item: Clients) => ({
        ...item,
        value: item._id,
        label: item.name,
      }))
      setOptionsClients(clients)
    })
  }, [])

  const onSelect = (data: string, option: Record<string, any>) => {
    form.setFieldValue('last_name', option.last_name)
    form.setFieldValue('email', option.email)
  }

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-3 gap-x-6'

  interface Total {
    label: string
    total: number
  }

  const getSubTotals = () => {
    let sumaSubtotal = 0
    let totalIva = 0
    let sumaDescuento = 0
    for (const detalle of detalles) {
      sumaSubtotal += detalle.importe
      sumaDescuento += detalle.discount
    }
    const subtotal: Total[] = [{ label: 'Subtotal', total: sumaSubtotal }]
    if (sumaDescuento > 0) {
      subtotal.push({
        label: 'Descuento',
        total: sumaDescuento,
      })
    }
    if (sumaSubtotal > 0) {
      totalIva = sumaSubtotal * 0.12
      subtotal.push({
        label: 'IVA 12%',
        total: totalIva,
      })
    }
    if (sumaSubtotal > 0 && totalIva > 0) {
      subtotal.push({
        label: 'Total',
        total: sumaSubtotal + totalIva,
      })
    }
    return subtotal
  }

  const subTotals = getSubTotals()

  const onSubmit = async (data: any) => {
    data.date = dayjs(data.date).format('YYYY-MM-DD')
    for (const totals of subTotals) {
      if (totals.label === 'Subtotal') {
        data.subtotal = totals.total
      }
      if (totals.label === 'Total') {
        data.total = totals.total
      }
      if (totals.label === 'IVA 12%') {
        data.iva = totals.total
      }
      if (totals.label === 'Descuento') {
        data.discount = totals.total
      }
    }
    console.log(data)
    try {
      if (router.query.id) {
        await axios.put(`/api/salesNotes/${router.query.id}`, data)
        message.success('Documento actualizado')
      } else {
        await axios.post('/api/salesNotes', data)
        message.success('Documento guardado correctamente')
      }
      router.push('/app/salesNotes')
    } catch (err) {
      showError(err)
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        date: dayjs(),
        forma_pago: 'efectivo',
      }}
    >
      <Card>
        <div className={cssColumnas}>
          <Form.Item
            name="invoice_number"
            label="Nº comprobante"
            rules={[$rules.required()]}
          >
            <Input placeholder="Ingrese el número de comprobante" />
          </Form.Item>
          <Form.Item name="date" label="Fecha">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="forma_pago"
            label="Forma de pago"
            rules={[$rules.required()]}
          >
            <Select
              placeholder="Escoja una de las opciones"
              options={[
                {
                  label: 'Efectivo',
                  value: 'efectivo',
                },
                {
                  label: 'Transferencia',
                  value: 'transferencia',
                },
                {
                  label: 'Tarjeta de crédito',
                  value: 'tarjeta',
                },
                {
                  label: 'Cheque',
                  value: 'cheque',
                },
              ]}
            />
          </Form.Item>
        </div>
      </Card>
      <Card className="mt-4 mb-4">
        <Typography.Title level={4}>Información cliente</Typography.Title>
        <div className={cssColumnas}>
          <Form.Item
            name="client_id"
            label="Cliente"
            rules={[$rules.required()]}
          >
            <Select
              showSearch
              placeholder="Seleccione un cliente"
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={optionsClients}
              onSelect={onSelect}
            />
          </Form.Item>
          <Form.Item name="last_name" label="Apellido">
            <Input placeholder="Ingrese el apellido" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Ingrese el correo" />
          </Form.Item>
        </div>
      </Card>
      <Card
        tabList={[{ key: 'detalles', tab: 'Detalles' }]}
        activeTabKey={tabActiva}
        onTabChange={(key) => setTabActiva(key as TabsKeys)}
      >
        <div className={tabActiva === 'detalles' ? '' : 'hidden'}>
          <Conceptos form={form} />
        </div>
      </Card>
      <Card className="mb-6">
        <div className="grid grid-flow-row-dense grid-cols-2 xl:grid-cols-3 md:grid-flow-col-dense sm:grid-flow-col-dense gap-x-6">
          <div className="col-span-2">
            <Form.Item name="observations" label="Observaciones">
              <TextArea placeholder="Ingrese alguna observación" rows={3} />
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Form.Item label="Totales">
              <div>
                <table className="border w-full">
                  <tbody>
                    {subTotals.map((x: Total, index: number) => (
                      <tr key={'subtotal' + index}>
                        <th className="text-left border p-2">{x.label}</th>
                        <td className="text-right border p-2">
                          {$filtros.currency(x.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Form.Item>
          </div>
        </div>
      </Card>
      <Form.Item name="total" noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="subtotal" noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="iva" noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Form.Item name="discount" noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Space className="mt-4 flex justify-end mr-4">
        <Button type="primary" className=" bg-blue-400" htmlType="submit">
          Guardar
        </Button>
        <Button className="ml-3" onClick={() => router.push('/app/salesNotes')}>
          Cancelar
        </Button>
      </Space>
    </Form>
  )
}

export default SalesNotes
