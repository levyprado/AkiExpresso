import { createContext, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ActiveProductContext = createContext(null)

export default function ActiveProductProvider({ children }) {
  const [activeProduct, setActiveProduct] = useState(null)

  return (
    <ActiveProductContext.Provider value={{ activeProduct, setActiveProduct }}>
      {children}
    </ActiveProductContext.Provider>
  )
}
