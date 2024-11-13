import PageHeader from '../components/PageHeader'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/Button'
import CheckoutShippingAddress from '../components/CheckoutShippingAddress'
import CheckoutProductItem from '../components/CheckoutProductItem'
import ShippingOption from '../components/ShippingOption'
import { CreditCard } from 'lucide-react'
import PaymentOption from '../components/PaymentOption'
import { useState } from 'react'
import { formatPrice } from '../utils'

const shippingOptions = [
  { id: 1, label: 'Expresso', arrival: 'Até 10 dias uteis', price: 4 },
  { id: 2, label: 'Premium', arrival: 'Até 5 dias uteis', price: 8 },
  { id: 3, label: 'Turbo', arrival: 'Até 3 dias uteis', price: 12 },
]

export default function Checkout({ checkoutProducts, checkoutOpen, onClick }) {
  const [isSelectingShipping, setIsSelectingShipping] = useState(false)
  const [shippingOption, setShippingOption] = useState(shippingOptions[0])
  const [selectedShippingOption, setSelectedShippingOption] =
    useState(shippingOption)

  const handleShippingSave = () => {
    setIsSelectingShipping(false)
    setShippingOption(selectedShippingOption)
  }
  const handleShippingCancel = () => {
    setIsSelectingShipping(false)
    setSelectedShippingOption(shippingOption)
  }

  const checkoutTotalPrice = checkoutProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0,
  )

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%', opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              type: 'spring',
              bounce: 0,
            }}
            className='fixed inset-0 bg-gray-50'
          >
            <div className='mx-auto grid h-dvh max-w-screen-lg grid-rows-[auto_1fr_auto] px-4'>
              <PageHeader page='Comprar' onClick={onClick} />
              <div className='no-scrollbar overflow-y-scroll py-1 md:py-2 xl:py-3'>
                <CheckoutShippingAddress />
                <ul className='mt-2 flex flex-col gap-4 py-4'>
                  {checkoutProducts.map(product => (
                    <CheckoutProductItem key={product.id} product={product} />
                  ))}
                </ul>
                <div className='space-y-3 border-b-2 border-gray-200 py-2 pb-4 md:space-y-4 xl:space-y-5'>
                  <div className='flex items-end justify-between'>
                    <span className='font-medium xl:text-lg'>
                      Subtotal, {checkoutProducts.length}{' '}
                      {checkoutProducts.length === 1 ? 'item' : 'itens'}
                    </span>
                    <p className='text-lg font-medium text-brand xl:text-xl'>
                      {formatPrice(checkoutTotalPrice)}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p className='font-medium xl:text-lg'>
                      Escolha um método de envio
                    </p>
                    <button
                      onClick={() => setIsSelectingShipping(true)}
                      className='px-1 py-0.5 text-sm text-brand hover:underline xl:text-base'
                    >
                      Ver opções
                    </button>
                  </div>
                  <ShippingOption
                    {...shippingOption}
                    shippingOption={shippingOption}
                    selectedShippingOption={selectedShippingOption}
                    setSelectedShippingOption={setSelectedShippingOption}
                  />

                  <div className='flex items-end justify-between'>
                    <label
                      className='font-medium xl:text-lg'
                      htmlFor='productMessage'
                    >
                      Mensagem:
                    </label>
                    <input
                      className='w-36 bg-transparent text-end text-lightgray-dark outline-none focus:placeholder:opacity-0 xl:text-lg [&:not(:placeholder-shown)]:w-10/12'
                      type='text'
                      id='productMessage'
                      placeholder='Digite aqui...'
                    />
                  </div>
                </div>
                <fieldset className='py-2 md:py-3'>
                  <legend className='block pt-3 text-lg font-medium md:pt-4'>
                    Método de pagamento
                  </legend>
                  <div className='flex items-center gap-2.5'>
                    <PaymentOption icon={<PixIcon />} label='Pix' />
                    <PaymentOption
                      icon={<CreditCard className='size-8' />}
                      label='Cartão de crédito'
                    />
                  </div>
                </fieldset>
              </div>
              <div className='-mx-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3'>
                <div>
                  <p className='text-sm leading-tight text-lightgray'>Total</p>
                  <p className='text-lg font-medium leading-tight'>$ 324.00</p>
                </div>
                <Button>Finalizar pedido</Button>
              </div>
            </div>
          </motion.div>
          <AnimatePresence>
            {isSelectingShipping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='fixed inset-0 z-10 grid place-items-center bg-black/40'
              >
                <div className='w-11/12 max-w-md space-y-4 rounded-lg bg-gray-50 p-4'>
                  <p className='text-lg font-medium'>
                    Escolha um metódo de envio
                  </p>
                  <ul className='grid grid-cols-1 gap-3'>
                    {shippingOptions.map(option => (
                      <ShippingOption
                        key={option.id}
                        {...option}
                        shippingOptions={shippingOptions}
                        selectedShippingOption={selectedShippingOption}
                        setSelectedShippingOption={setSelectedShippingOption}
                      />
                    ))}
                  </ul>
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={handleShippingCancel}
                      className='rounded-lg px-4 py-2 font-semibold hover:bg-gray-200'
                    >
                      Cancelar
                    </button>
                    <Button onClick={handleShippingSave}>Salvar</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}

function PixIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 48 48'>
      <path
        fill='#4db6ac'
        d='M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z'
      ></path>
      <path
        fill='#4db6ac'
        d='M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z'
      ></path>
      <path
        fill='#4db6ac'
        d='M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z'
      ></path>
    </svg>
  )
}
