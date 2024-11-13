import { ShoppingCart, User } from 'lucide-react'
import SearchForm from './SearchForm'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import { CartProductsContext } from '../context/CartProductsProvider'
import { AnimatePresence, motion } from 'framer-motion'

export default function Header() {
  const { setActiveProduct } = useContext(ActiveProductContext)
  const { cartProducts } = useContext(CartProductsContext)

  return (
    <header className='lg:fixed lg:left-0 lg:top-0 lg:z-20 lg:w-full lg:max-w-none lg:bg-gradient-to-b lg:from-brand-dark lg:to-brand-light'>
      <div className='relative flex w-full items-center justify-between px-4 py-3 lg:mx-auto lg:max-w-screen-xl lg:py-6 xl:py-7 2xl:py-8'>
        <Link className='-ml-1 flex items-center gap-2.5' to='/'>
          <img
            className='size-10 lg:size-12'
            src='/images/logo.png'
            alt='Logo'
            width={350}
            height={350}
          />
          <h1 className='text-lg lg:text-xl lg:font-medium lg:text-white'>
            AkiExpresso
          </h1>
        </Link>
        <a
          className='text-sm text-brand underline lg:hidden'
          href='https://github.com/levyprado'
          target='_blank'
        >
          Por Levy
        </a>
        <div className='hidden w-8/12 lg:block'>
          <SearchForm />
        </div>
        <div className='hidden lg:mb-2 lg:mr-8 lg:flex lg:items-center lg:gap-10 lg:self-end'>
          <Link
            onClick={() => setActiveProduct(null)}
            className='relative hidden lg:block'
            to={'/cart'}
          >
            <ShoppingCart className='size-7 text-white' />
            <AnimatePresence initial={false}>
              {cartProducts.length > 0 && (
                <motion.span
                  key={cartProducts.length}
                  initial={{ opacity: cartProducts.length > 0 ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='absolute -right-2 -top-1.5 flex size-5 items-center justify-center rounded-full bg-white text-sm font-medium text-brand'
                >
                  <motion.span
                    key={cartProducts.length}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ bounce: 0 }}
                  >
                    {cartProducts.length}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link
            onClick={() => setActiveProduct(null)}
            className='hidden lg:block'
            to={'/profile'}
          >
            <div className='flex size-7 items-center justify-center overflow-hidden rounded-full bg-white'>
              <User className='size-6 text-lightgray' />
            </div>
          </Link>
        </div>
        <a
          className='absolute bottom-1 right-0 mr-8 hidden text-sm text-white underline lg:block'
          href='https://github.com/levyprado'
          target='_blank'
        >
          Por Levy
        </a>
      </div>
    </header>
  )
}
