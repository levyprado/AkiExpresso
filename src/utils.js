export function formatAddress(address) {
  return `${address.street}, ${address.complement ? `${address.complement}, ` : ''} ${address.houseNumber}, ${address.bairro}, ${address.stateCity}, ${address.cep}`
}

export function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price * 5.74)
}
