import { Minus, Plus } from 'lucide-react'
import { useContext, useId } from 'react'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProductsContext } from '../context/CartProductsProvider'
import QuantityButton from './QuantityButton'
import { formatPrice } from '../utils'

export default function CartItem({
  cartItem,
  handleOnChange,
  checkoutProducts,
  setCheckoutProducts,
}) {
  const { setActiveProduct } = useContext(ActiveProductContext)
  const { setCartProducts } = useContext(CartProductsContext)
  const id = useId()

  const handleOnDecrease = () => {
    if (cartItem.quantity === 1) {
      setCartProducts(prev => prev.filter(p => p.id !== cartItem.id))
      setCheckoutProducts(prev => prev.filter(p => p.id !== cartItem.id))
    } else {
      setCartProducts(prev =>
        prev.map(p => {
          if (p.id === cartItem.id) {
            return {
              ...p,
              quantity: p.quantity - 1,
            }
          }
          return p
        }),
      )
    }
  }

  const handleOnIncrease = () => {
    setCartProducts(prev =>
      prev.map(p => {
        if (p.id === cartItem.id) {
          return {
            ...p,
            quantity: p.quantity + 1,
          }
        }
        return p
      }),
    )
    setCheckoutProducts(prev =>
      prev.map(p => {
        if (p.id === cartItem.id) {
          return {
            ...p,
            quantity: p.quantity + 1,
          }
        }
        return p
      }),
    )
  }

  return (
    <div className='grid grid-cols-[auto_35%_1fr] gap-2.5 rounded-lg border-2 border-gray-200 bg-white p-3 sm:grid-cols-[auto_auto_1fr]'>
      <label className='size-5 h-full' htmlFor={id}>
        <input
          className='size-full text-brand accent-brand'
          type='checkbox'
          id={id}
          value={cartItem.id}
          checked={checkoutProducts.some(p => p.id === cartItem.id)}
          onChange={() => handleOnChange(cartItem)}
        />
      </label>
      <button onClick={() => setActiveProduct(cartItem)} className='relative'>
        <img
          className='mx-auto min-h-24 w-full max-w-32 rounded-lg object-cover'
          src={cartItem?.images[0]}
          alt={cartItem.title}
        />
      </button>
      <div className='flex flex-col justify-between'>
        <button
          onClick={() => setActiveProduct(cartItem)}
          className='space-y-1 text-start'
        >
          <motion.h3
            layoutId={`title-${cartItem.id}`}
            className='line-clamp-2 leading-tight text-lightgray-dark md:text-lg'
          >
            {cartItem.title}
          </motion.h3>
          <motion.p
            layoutId={`price-${cartItem.id}`}
            className='font-medium md:text-lg'
          >
            {formatPrice(cartItem.price)}
          </motion.p>
        </button>
        <div className='ml-auto flex items-center gap-3.5'>
          <QuantityButton
            onClick={handleOnDecrease}
            icon={<Minus className='size-4 md:size-5' />}
            label='Decrease'
          />
          <AnimatePresence initial={false} mode='wait'>
            <motion.span
              key={cartItem.quantity}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.2, bounce: 0 }}
              className='font-medium md:text-lg'
            >
              {cartItem.quantity}
            </motion.span>
          </AnimatePresence>
          <QuantityButton
            onClick={handleOnIncrease}
            icon={<Plus className='size-4 md:size-5' />}
            label='Increase'
          />
        </div>
      </div>
    </div>
  )
}
