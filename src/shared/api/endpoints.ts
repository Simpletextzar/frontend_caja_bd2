export const endpoints = {
  cajeros: {
    list: () => "/cajeros",
    create: () => "/cajeros",
    update: (id: number | string) => `/cajeros/${id}`,
    delete: (id: number | string) => `/cajeros/${id}`,
    byId: (id: number | string) => `/cajeros/${id}`,
  },

  contribuyentes: {
    list: () => "/contribuyentes",
    create: () => "/contribuyentes",
    update: (id: number | string) => `/contribuyentes/${id}`,
    delete: (id: number | string) => `/contribuyentes/${id}`,
    byId: (id: number | string) => `/contribuyentes/${id}`,
  },

  conceptoPago: {
    list: () => "/conceptos-pago",
    create: () => "/conceptos-pago",
    update: (id: number | string) => `/conceptos-pago/${id}`,
    delete: (id: number | string) => `/conceptos-pago/${id}`,
    byId: (id: number | string) => `/conceptos-pago/${id}`,
  },

  pagos: {
    create: () => "/pagos",
    byId: (id: number | string) => `/pagos/${id}`,
  },

  recibos: {
    list: () => "/recibos",
    byId: (id: number | string) => `/recibos/${id}`,
  },

  extornos: {
    create: () => "/extornos",
  },
} as const;
