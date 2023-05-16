interface GenericObject {
  [key: string]: any,
}
export const statusClasses:GenericObject = {
  '1':'progress',
  '2':'ready',
  '4':'error',
}

export const ORDER_RECIEVE_TIMEOUT = 10000;