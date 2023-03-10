import axios from 'axios'
import { User } from '@/types/User'
import $rules from '@/assets/rules'
import { RcFile } from 'antd/es/upload'
import { useRouter } from 'next/router'
import { Cellar } from '@/types/Cellars'
import { useEffect, useState } from 'react'
import { showError } from '@/assets/utils'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'

export default function FormClient() {
  const router = useRouter()
  const [form] = Form.useForm()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://megashop.ec/wp-content/uploads/2020/11/silla-giratoria-.jpg',
    },
  ])
  const [warehouseOptions, setWarehouseOptions] = useState<
    { label: string; value: string }[]
  >([])

  const init = async () => {
    axios.get('/api/cellars').then(({ data }) => {
      const warehouseOptions = data.map((item: Cellar) => ({
        label: `${item.code} - ${item.name}`,
        value: item._id,
      }))
      setWarehouseOptions(warehouseOptions)
    })
    setWarehouseOptions(warehouseOptions)
  }

  const handleCancel = () => setPreviewOpen(false)

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    )
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList)

  useEffect(() => {
    if (router.query.id) {
      axios.get(`/api/products/${router.query.id}`).then(({ data }) => {
        form.setFieldsValue(data)
      })
    }
  }, [router.query.id])

  useEffect(() => {
    Promise.all([init()])
  }, [])

  const onSubmit = async (data: User) => {
    try {
      if (router.query.id) {
        await axios.put(`/api/products/${router.query.id}`, data)
        message.success('Documento actualizado')
      } else {
        await axios.post('/api/products', data)
        message.success('Documento guardado correctamente')
      }
      router.push('/app/productos')
    } catch (e) {
      showError(e)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-2 gap-x-6'

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        price: 0,
      }}
    >
      <Card className="mb-4">
        <div className={cssColumnas}>
          <Form.Item name="code" label="Código" rules={[$rules.required()]}>
            <Input placeholder="Ingrese el código" />
          </Form.Item>

          <Form.Item name="name" label="Nombre" rules={[$rules.required()]}>
            <Input placeholder="Ingrese una descripción" />
          </Form.Item>
          <Form.Item name="description" label="Descripción">
            <Input placeholder="Ingrese una descripción" />
          </Form.Item>
          <Form.Item name="price" label="Precio" rules={[$rules.required()]}>
            <InputNumber
              className="w-full"
              precision={2}
              placeholder="Ingrese el precio del productos"
            />
          </Form.Item>
          <Form.Item
            name="cellar_id"
            label="Bodega"
            rules={[$rules.required()]}
          >
            <Select
              options={warehouseOptions}
              className="w-full"
              placeholder="Seleccione"
            />
          </Form.Item>
          <Form.Item name="imag" label="Imagen">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </div>
      </Card>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Space className="mt-4 flex justify-end mr-4">
        <Button type="primary" className=" bg-blue-400" htmlType="submit">
          Guardar
        </Button>
        <Button className="ml-3" onClick={() => router.push('/app/productos')}>
          Cancelar
        </Button>
      </Space>
    </Form>
  )
}
