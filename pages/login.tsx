import axios from 'axios'
import Head from 'next/head'
import $rules from '@/assets/rules'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, Space } from 'antd'
import { crearToken, showError } from '@/assets/utils'

interface LoginRespuesta {
  name: string
  token: string
}

const LoginEmpresa: FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (value: unknown) => {
    if (isLoading === true) {
      return
    }
    setIsLoading(true)
    try {
      const { data } = await axios.post<LoginRespuesta>('/api/auth/user', value)
      crearToken(data.token)
      router.push((router.query.redirect as string) || '/app')
    } catch (err) {
      showError(err)
      setIsLoading(false)
    }
  }

  return (
    <div className="bg.gray.300 flex  items-center justify-center">
      <Head>
        <title>Inicio de sesión</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-t-lg border	p-10 dark:bg-zinc-700">
          <div className="mb-5 flex items-center justify-between">
            <div className="text-2xl font-bold">Inicio de sesión</div>
          </div>
          <Form className="" layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Usuario"
              rules={[$rules.required()]}
              name="username"
              normalize={(text: string) => text.trim()}
            >
              <Input
                placeholder="Ingrese el nombre de usuario"
                autoComplete="current-username"
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              rules={[$rules.required()]}
              name="password"
            >
              <Input.Password
                placeholder="Ingrese la contraseña"
                autoComplete="current-password"
              />
            </Form.Item>
            <Space className="w-full" direction="vertical" size="middle">
              <Button
                className={`mt-4 w-full rounded-md bg-red-500 text-white hover:bg-sky-700 focus:ring-2 hover:focus:ring-red-600 dark:hover:bg-sky-700`}
                type="primary"
                htmlType="submit"
                shape="round"
                loading={isLoading}
              >
                Iniciar sesión
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginEmpresa
