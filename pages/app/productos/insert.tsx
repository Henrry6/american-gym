import axios from 'axios'
import { useEffect, useState } from 'react'
import $rules from '@/assets/rules'
import { User } from '@/types/User'
import { Warehouse } from '@/types/Warehouse'
import { useRouter } from 'next/router'
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import { PlusOutlined } from '@ant-design/icons'

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
  const [warehouses, setusers] = useState<Warehouse[]>([])

  const init = async () => {
    /*
    axios.get('/api/warehouses').then(({ data }) => {
      const warehouses = data.map((item: Warehouse, index: number) => ({
        ...item,
        key: index,
      }))
      setusers(warehouses)
    })*/
    const warehouses = [
      {_id: "1", code: "B1", name:"Bodega Test", dimension:500, address:{sector:"TUMBACO"}}
    ];
    setusers(warehouses);
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

  const onSubmit = (data: User) => {
    console.log(data)
    if (router.query.id) {
      axios.put(`/api/products/${router.query.id}`, data)
      message.success('Documento actualizado')
    } else {
      axios.post('/api/products', data)
      message.success('Documento guardado correctamente')
    }
    router.push('/app/productos')
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const cssColumnas = 'grid grid-cols-1 md:grid-cols-2 gap-x-6'

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <div className={cssColumnas}>
        <Form.Item name="code" label="Código" rules={[$rules.required()]}>
          <Input placeholder="Ingrese el código" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripción"
          rules={[$rules.required()]}
        >
          <Input placeholder="Ingrese una descripción" />
        </Form.Item>
        <Form.Item name="title" label="Titulo">
          <Input placeholder="Ingrese un titulo" />
        </Form.Item>
        <Form.Item name="price" label="Precio">
          <InputNumber
            className="w-full"
            precision={2}
            placeholder="Ingrese el precio del productos"
          />
        </Form.Item>
        <Form.Item name="warehouse" label="Bodega">
          <Select
            options={warehouses}
            className="w-full"
            placeholder="Seleccione"
          />
        </Form.Item>
        <Form.Item name="imag" label="Precio">
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
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      <Button type="primary" className=" bg-blue-400" htmlType="submit">
        Guardar
      </Button>
      <Button className="ml-3" onClick={() => router.push('/app/productos')}>
        Cancelar
      </Button>
    </Form>
  )
}
