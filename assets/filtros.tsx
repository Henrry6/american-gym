import dayjs from 'dayjs'

const defaultLocale = 'es-EC'
const defaultCurrency = 'USD'

const $filtros = {
  currency(value?: number | string, arg = 2): string {
    if (!value) {
      value = 0
    }
    return new Intl.NumberFormat(defaultLocale, {
      style: 'currency',
      currency: defaultCurrency,
      minimumFractionDigits: arg,
    }).format(typeof value === 'number' ? value : parseFloat(value))
  },
  date(value: string, format = 'DD/MM/YYYY'): string {
    return dayjs(value).format(format)
  },
  completeDate(value: string): string {
    return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
  },
  month(value: string): string {
    return dayjs(value).format('MM/YYYY')
  },
}

export default $filtros
