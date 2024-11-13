import { MapPin } from 'lucide-react'
import SearchForm from './SearchForm'
import CategoryGrid from './CategoryGrid'
import FlashSaleCard from './FlashSaleCard'
import { useContext, useState } from 'react'
import { ShippingAddressContext } from '../context/ShippingAddressProvider'
import SelectShippingAddress from './SelectShippingAddress'
import { AnimatePresence } from 'framer-motion'
import { formatAddress } from '../utils'

export default function Hero() {
  const [isSelectingShippingAddress, setIsSelectingShippingAddress] =
    useState(false)
  const { address } = useContext(ShippingAddressContext)

  return (
    <>
      <div className='mx-auto max-w-screen-xl px-4 py-1 lg:pt-24 xl:pt-28 2xl:pt-32'>
        <div className='lg:hidden'>
          <SearchForm />
        </div>
        <button
          onClick={() => setIsSelectingShippingAddress(true)}
          className='my-2.5 flex w-full max-w-fit items-center justify-start gap-1 text-sm sm:text-base'
        >
          <MapPin className='shrink-0 text-brand' />
          <p className='truncate'>
            {address.street ? (
              <>
                <span className='text-lightgray'>Entrega para </span>
                <span className='font-medium text-gray-950'>
                  {formatAddress(address)}
                </span>
              </>
            ) : (
              'Adicione seu endereço de entrega'
            )}
          </p>
        </button>
        <CategoryGrid />
        <div className='lg:grid lg:grid-cols-2 lg:gap-4'>
          <FlashSaleCard />
          <div className='hidden lg:block'>
            <FlashSaleCard />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isSelectingShippingAddress && (
          <SelectShippingAddress
            onCancel={() => setIsSelectingShippingAddress(false)}
            setIsSelectingShippingAddress={setIsSelectingShippingAddress}
          />
        )}
      </AnimatePresence>
    </>
  )
}
