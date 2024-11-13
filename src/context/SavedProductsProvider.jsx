import { createContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// eslint-disable-next-line react-refresh/only-export-components
export const SavedProductsContext = createContext(null)

export default function SavedProductsProvider({ children }) {
  const [savedProducts, setSavedProducts] = useLocalStorage('savedProducts', [])

  return (
    <SavedProductsContext.Provider value={{ savedProducts, setSavedProducts }}>
      {children}
    </SavedProductsContext.Provider>
  )
}
