import { useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { Check, Heart, ShoppingCart } from 'lucide-react'
import PageHeader from './PageHeader'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import Button from './Button'
import { SavedProductsContext } from '../context/SavedProductsProvider'
import { CartProductsContext } from '../context/CartProductsProvider'
import { formatPrice } from '../utils'

export default function ProductDetail() {
  const { savedProducts, setSavedProducts } = useContext(SavedProductsContext)
  const { cartProducts, setCartProducts } = useContext(CartProductsContext)
  const { activeProduct, setActiveProduct } = useContext(ActiveProductContext)

  const [position, setPosition] = useState({
    left: 0,
  })
  const [imgIndex, setImgIndex] = useState(0)
  const dragX = useMotionValue(0)

  useEffect(() => {
    setImgIndex(0)
  }, [activeProduct])

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -15 && imgIndex < activeProduct.images.length - 1) {
      setImgIndex(pv => pv + 1)
    } else if (x >= 15 && imgIndex > 0) {
      setImgIndex(pv => pv - 1)
    }
  }

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setActiveProduct(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setActiveProduct])

  const handleOnSave = () => {
    if (savedProducts.some(p => p.id === activeProduct.id)) {
      setSavedProducts(prev => prev.filter(p => p.id !== activeProduct.id))
    } else {
      setSavedProducts(prev => [...prev, activeProduct])
    }
  }

  const handleOnAddToCart = () => {
    if (cartProducts.some(p => p.id === activeProduct.id)) {
      setCartProducts(prev => prev.filter(p => p.id !== activeProduct.id))
    } else {
      setCartProducts(prev => [
        ...prev,
        {
          ...activeProduct,
          quantity: 1,
        },
      ])
    }
  }

  return (
    <AnimatePresence>
      {activeProduct ? (
        <motion.div
          key='overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-activeproduct='true'
          className='fixed inset-0 z-10 overflow-y-scroll bg-gray-50'
        >
          <div className='mx-auto grid h-dvh max-w-screen-xl grid-rows-[auto_1fr_auto] px-4 lg:flex lg:flex-col'>
            <div className='lg:pt-24 xl:pt-28'>
              <PageHeader
                page='Product Details'
                onClick={() => setActiveProduct(null)}
              />
            </div>
            <div className='no-scrollbar overflow-y-scroll lg:mx-auto lg:flex lg:gap-6 xl:gap-8 2xl:gap-10'>
              <div className='mx-auto my-2 max-w-md overflow-hidden rounded-lg lg:mx-0 lg:my-0'>
                <motion.div
                  drag='x'
                  dragConstraints={{ left: 0, right: 0 }}
                  animate={{ translateX: `-${imgIndex * 100}%` }}
                  style={{ x: dragX }}
                  transition={{ bounce: 0 }}
                  onDragEnd={onDragEnd}
                  className='flex cursor-grab items-center active:cursor-grabbing'
                >
                  {activeProduct.images.map((image, i) => (
                    <div key={i} className='aspect-square w-full shrink-0'>
                      <motion.img
                        className='pointer-events-none size-full scale-95 rounded-lg object-cover'
                        src={image}
                        alt=''
                      />
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ y: -25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.05, bounce: 0.25 }}
                  className='relative w-full'
                >
                  <div className='flex items-center justify-between py-1'>
                    <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5'>
                      {activeProduct.images.map((image, i) => (
                        <Tabs
                          key={i}
                          active={i === imgIndex}
                          setPosition={setPosition}
                          onClick={() => setImgIndex(i)}
                        />
                      ))}
                      <motion.div
                        animate={position}
                        className='absolute left-0 h-1 w-12 rounded-lg bg-brand'
                      />
                    </div>
                    <div className='ml-auto rounded-full bg-brand/15 px-2.5 py-0.5 text-sm text-brand-dark'>
                      {imgIndex + 1}/{activeProduct.images.length}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className='flex flex-col'>
                <div className='space-y-1.5 lg:space-y-2'>
                  <motion.h3 className='relative text-lg font-medium leading-tight lg:text-2xl'>
                    {activeProduct.title}
                  </motion.h3>
                  <motion.p className='relative text-xl text-brand-dark lg:text-3xl'>
                    {formatPrice(activeProduct.price)}
                  </motion.p>
                </div>
                <motion.div
                  key='description'
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0, transition: { delay: 0 } }}
                  transition={{ type: 'spring', delay: 0.1, bounce: 0 }}
                  className='mt-2 space-y-1.5 py-2 lg:mt-4'
                >
                  <h5 className='font-medium lg:text-lg'>
                    Descrição do Produto
                  </h5>
                  <p className='max-w-prose text-sm text-lightgray lg:text-base'>
                    {activeProduct.description}
                  </p>
                </motion.div>
                <div className='hidden lg:mt-auto lg:grid lg:grid-cols-2 lg:gap-4'>
                  <AnimatePresence mode='wait'>
                    <Button
                      key={savedProducts.some(p => p.id === activeProduct.id)}
                      onClick={handleOnSave}
                      outline={true}
                      icon={
                        <Heart
                          className={`size-5 ${savedProducts.some(p => p.id === activeProduct.id) ? 'fill-brand' : ''}`}
                        />
                      }
                    >
                      <motion.span
                        key={savedProducts.some(p => p.id === activeProduct.id)}
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: 15,
                          opacity: 0,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {savedProducts.some(p => p.id === activeProduct.id)
                          ? 'Salvo'
                          : 'Salvar'}
                      </motion.span>
                    </Button>
                  </AnimatePresence>
                  <AnimatePresence mode='wait'>
                    <Button
                      key={cartProducts.some(p => p.id === activeProduct.id)}
                      onClick={handleOnAddToCart}
                      icon={
                        cartProducts.some(p => p.id === activeProduct.id) ? (
                          <Check className='size-5' />
                        ) : (
                          <ShoppingCart className='size-5' />
                        )
                      }
                    >
                      <motion.span
                        key={cartProducts.some(p => p.id === activeProduct.id)}
                        initial={{ y: -15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{
                          y: 15,
                          opacity: 0,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {cartProducts.some(p => p.id === activeProduct.id)
                          ? 'Adicionado'
                          : 'Adicionar'}
                      </motion.span>
                    </Button>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { delay: 0 } }}
              transition={{ type: 'spring', delay: 0.15, bounce: 0.25 }}
              className='-mx-4 border-t border-gray-200 bg-white lg:hidden'
            >
              <div className='grid grid-cols-2 gap-3 px-4 py-3'>
                <AnimatePresence mode='wait'>
                  <Button
                    key={savedProducts.some(p => p.id === activeProduct.id)}
                    onClick={handleOnSave}
                    outline={true}
                    icon={
                      <Heart
                        className={`size-5 ${savedProducts.some(p => p.id === activeProduct.id) ? 'fill-brand' : ''}`}
                      />
                    }
                  >
                    <motion.span
                      key={savedProducts.some(p => p.id === activeProduct.id)}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{
                        y: 15,
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {savedProducts.some(p => p.id === activeProduct.id)
                        ? 'Salvo'
                        : 'Salvar'}
                    </motion.span>
                  </Button>
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                  <Button
                    key={cartProducts.some(p => p.id === activeProduct.id)}
                    onClick={handleOnAddToCart}
                    icon={
                      cartProducts.some(p => p.id === activeProduct.id) ? (
                        <Check className='size-5' />
                      ) : (
                        <ShoppingCart className='size-5' />
                      )
                    }
                  >
                    <motion.span
                      key={cartProducts.some(p => p.id === activeProduct.id)}
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{
                        y: 15,
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {cartProducts.some(p => p.id === activeProduct.id)
                        ? 'Adicionado'
                        : 'Adicionar'}
                    </motion.span>
                  </Button>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Tabs({ onClick, setPosition, active = false }) {
  const ref = useRef(null)

  useEffect(() => {
    active && setPosition({ left: ref.current.offsetLeft })
  }, [active, setPosition])

  return (
    <button
      ref={ref}
      onClick={onClick}
      className='h-1 w-12 rounded-lg bg-gray-300'
    />
  )
}
