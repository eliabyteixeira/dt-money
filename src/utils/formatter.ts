export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateToSave = (value: Date) =>
  `${value.toISOString().substring(0, 10)} 00:00:00 GMT-0300`

export const normalizePhoneNumber = (value: string | undefined) => {
  return !value
    ? ''
    : value
        .replace(/[\D]/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})(\d+?)/, '$1')
}
