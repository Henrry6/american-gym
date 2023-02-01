class Configs {
  /**
   * El pais en el cual se está operando.
   */
  readonly pais: 'ec' | 'mx' =
    process.env.NEXT_PUBLIC_COUNTRY === 'mx' ? 'mx' : 'ec'

  /**
   * El host donde está corriendo el app en vue.
   */
  readonly hostAppVue: string = process.env.NEXT_PUBLIC_HOST_APP_VUE!

  /**
   * El host de UpConta restaurantes.
   */
  readonly hostRestaurantes: string = process.env.NEXT_PUBLIC_HOST_RESTAURANTES!
  readonly hostContinuidad: string = process.env.NEXT_PUBLIC_HOST_CONTINUIDAD!
  readonly hostActivosFijos: string =
    process.env.NEXT_PUBLIC_HOST_ACTIVOS_FIJOS!
  readonly hostApi: string =
    process.env.NEXT_PUBLIC_API! || 'http://localhost:2022'
  // 'https://henrry-api.herokuapp.com' || process.env.NEXT_PUBLIC_API!

  readonly redireccionar: boolean =
    process.env.NEXT_PUBLIC_REDIRECCIONAR === 'true'

  readonly DOMINIO: string = process.env.NEXT_PUBLIC_DOMINIO || ''

  /**
   * El nombre del token para los usuarios.
   */
  readonly tokenName = process.env.NEXT_PUBLIC_TOKEN_NAME || 'test_rijwb'

  /**
   * La key para establecer conexión con el recaptcha
   */
  readonly recaptcha =
    process.env.NEXT_PUBLIC_RECAPTCHA ||
    '6LcfcP4gAAAAAMEkPmapjDHPS0SV77EW3c9H-yj-'

  get analyticsId() {
    if (this.hostApi.includes('test') || this.hostApi.includes('localhost'))
      return null
    return this.pais === 'ec' ? 'G-NV4J3EP9S4' : 'G-SJLSRTFQ33'
  }

  get isEc() {
    return this.pais === 'ec'
  }

  get isMx() {
    return this.pais === 'mx'
  }

  get appName() {
    return this.isEc ? 'UpConta' : 'UpConta Mx'
  }
}

const configs = new Configs()

export default configs
