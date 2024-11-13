import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import CartItem from '../components/CartItem'
import { useContext, useState } from 'react'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import ProductDetail from '../components/ProductDetail'
import Checkout from './Checkout'
import Button from '../components/Button'
import { CartProductsContext } from '../context/CartProductsProvider'
import EmptyMessage from '../components/EmptyMessage'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils'
import Header from '../components/Header'

export default function Cart() {
  const [checkoutProducts, setCheckoutProducts] = useState([])
  const { cartProducts } = useContext(CartProductsContext)
  const { activeProduct } = useContext(ActiveProductContext)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const navigate = useNavigate()

  const handleOnChange = cartItem => {
    if (checkoutProducts.some(p => p.id === cartItem.id)) {
      setCheckoutProducts(prev => prev.filter(p => p.id !== cartItem.id))
    } else {
      setCheckoutProducts(prev => [...prev, cartItem])
    }
  }

  const handleSelectAll = () => {
    if (checkoutProducts.length === cartProducts.length) {
      setCheckoutProducts([])
    } else {
      setCheckoutProducts(cartProducts)
    }
  }

  const cartTotalPrice = cartProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0,
  )

  return (
    <div className='bg-gray-50'>
      <div className={` ${checkoutOpen ? 'hidden' : 'hidden lg:block'}`}>
        <Header />
      </div>
      <div className='mx-auto grid h-dvh max-w-screen-lg grid-rows-[auto_1fr_auto] bg-gray-50 px-4 lg:pt-24 xl:pt-28 2xl:pt-32'>
        <PageHeader page='Carrinho' onClick={() => navigate('/')} />
        <div className='no-scrollbar flex flex-col gap-4 overflow-y-scroll py-2 pb-4 md:py-3 md:pb-6'>
          {cartProducts.length > 0 ? (
            cartProducts.map(cartItem => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                checkoutProducts={checkoutProducts}
                setCheckoutProducts={setCheckoutProducts}
                handleOnChange={handleOnChange}
              />
            ))
          ) : (
            <EmptyMessage message='Nenhum item no carrinho.' />
          )}
        </div>
        <div className='-mx-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3'>
          <div className='flex items-center gap-5'>
            <label className='flex items-center gap-2' htmlFor='select-all'>
              <input
                className='size-5 accent-brand'
                type='checkbox'
                id='select-all'
                onChange={handleSelectAll}
                checked={checkoutProducts.length === cartProducts.length}
                value={checkoutProducts.length === cartProducts.length}
              />
              <span className='text-sm'>Todos</span>
            </label>
            <div className='leading-tight'>
              <p className='text-sm text-lightgray'>Total</p>
              <motion.p
                key={cartTotalPrice}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                className='font-medium'
              >
                {formatPrice(cartTotalPrice)}
              </motion.p>
            </div>
          </div>
          <Button
            onClick={() => {
              if (checkoutProducts.length === 0) return
              setCheckoutOpen(true)
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
      <Checkout
        checkoutOpen={checkoutOpen}
        onClick={() => setCheckoutOpen(false)}
        checkoutProducts={checkoutProducts}
      />
      {activeProduct && <ProductDetail key={activeProduct.id} />}
    </div>
  )
}
