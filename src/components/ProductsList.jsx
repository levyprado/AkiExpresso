import { useContext } from 'react'
import ProductItem from './ProductItem'
import { ActiveProductContext } from '../context/ActiveProductProvider'

export default function ProductsList({ products }) {
  const { setActiveProduct } = useContext(ActiveProductContext)

  return (
    <ul className='mx-auto grid max-w-screen-xl grid-cols-2 gap-3 px-2 pb-24 pt-2 sm:grid-cols-3 sm:gap-4 sm:px-4 md:grid-cols-4 lg:grid-cols-5'>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          setActiveProduct={setActiveProduct}
        />
      ))}
    </ul>
  )
}
