export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateToSave = (value: Date) =>
  `${value.toISOString().substring(0, 10)} 00:00:00 GMT-0300`
