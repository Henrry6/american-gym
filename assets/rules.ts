import { Rule } from 'antd/lib/form'

const pattern = (
  patron: RegExp,
  message = 'No se cumple el formato requerido'
): Rule => ({
  pattern: patron,
  message,
})

const $rules = {
  required: (message = 'El campo es requerido'): Rule => ({
    required: true,
    message,
  }),
  max: (
    max: number,
    message = `Se permite máximo ${max.toString()} caracteres`
  ): Rule => ({
    max,
    message,
  }),
  min: (
    min: number,
    message = `Se permite mínimo ${min.toString()} caracteres`
  ): Rule => ({
    min,
    message,
  }),
  rfc: (): Rule => ({
    pattern:
      /^[A-Z&amp;Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/,
    message: 'Ingrese un RFC válido',
  }),
  email: (message = 'El correo electrónico no es válido'): Rule => ({
    type: 'email',
    message,
  }),
  pattern,
}

export default $rules
