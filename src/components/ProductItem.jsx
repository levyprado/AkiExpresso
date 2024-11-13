import { Ellipsis } from 'lucide-react'
import { formatPrice } from '../utils'

export default function ProductItem({ product, setActiveProduct }) {
  return (
    <li>
      <button
        onClick={() => setActiveProduct(product)}
        className='flex h-full w-full flex-col gap-1.5 rounded-lg border-2 border-gray-200 bg-white px-2.5 py-2 text-start'
      >
        <img className='mx-auto w-full rounded-lg' src={product.images[0]} />
        <h2 className='line-clamp-3 text-sm leading-4 lg:text-base lg:leading-5'>
          {product.title}
        </h2>
        <div className='flex-1'></div>
        <div className='flex w-full items-center justify-between'>
          <p className='relative text-brand-dark lg:font-medium'>
            {formatPrice(product.price)}
          </p>
          <Ellipsis className='size-5 text-gray-400' />
        </div>
      </button>
    </li>
  )
}
