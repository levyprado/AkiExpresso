import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const ShippingAddressContext = createContext(null)

export default function ShippingAddressProvider({ children }) {
  const [address, setAddress] = useLocalStorage('shippingAddress', {
    name: '',
    phone: '',
    cep: '',
    stateCity: '',
    bairro: '',
    street: '',
    houseNumber: '',
    complement: '',
  })

  return (
    <ShippingAddressContext.Provider value={{ address, setAddress }}>
      {children}
    </ShippingAddressContext.Provider>
  )
}
