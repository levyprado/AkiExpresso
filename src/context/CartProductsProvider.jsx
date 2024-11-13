import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const CartProductsContext = createContext(null)

export default function CartProductsProvider({ children }) {
  const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', [])

  return (
    <CartProductsContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartProductsContext.Provider>
  )
}
