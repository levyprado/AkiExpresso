import { formatPrice } from '../utils'

export default function CheckoutProductItem({ product }) {
  return (
    <li className='grid grid-cols-[25%_1fr] gap-4 sm:flex'>
      <img
        className='rounded-lg sm:max-w-32'
        src={product.images[0]}
        alt={product.title}
      />
      <div className='flex w-full flex-col justify-between gap-4'>
        <div className='space-y-1'>
          <h4 className='leading-tight sm:text-lg'>{product.title}</h4>
        </div>
        <div className='flex items-center justify-between'>
          <p className='font-medium sm:text-lg'>{formatPrice(product.price)}</p>
          <span className='text-sm text-lightgray sm:text-sm md:text-base'>
            x{product.quantity || 1}
          </span>
        </div>
      </div>
    </li>
  )
}
