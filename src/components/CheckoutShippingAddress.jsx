import { ChevronRight, MapPin } from 'lucide-react'
import { useContext, useState } from 'react'
import { ShippingAddressContext } from '../context/ShippingAddressProvider'
import { formatAddress } from '../utils'
import SelectShippingAddress from './SelectShippingAddress'
import { AnimatePresence } from 'framer-motion'

export default function CheckoutShippingAddress() {
  const [isSelectingShippingAddress, setIsSelectingShippingAddress] =
    useState(false)
  const { address } = useContext(ShippingAddressContext)

  return (
    <>
      <button
        onClick={() => setIsSelectingShippingAddress(true)}
        className='w-full space-y-2 rounded-lg border-2 border-gray-200 bg-white p-2.5 text-start outline-none focus:border-lightgray-dark md:p-3 lg:p-4'
      >
        <div className='flex items-center gap-2'>
          <MapPin className='text-brand' />
          <span className='font-medium lg:text-lg'>Endereço de Entrega</span>
        </div>
        {address.street ? (
          <div className='space-y-2 pl-8'>
            <div className='flex items-center'>
              <p className='text-sm leading-tight lg:text-base'>
                {formatAddress(address)}
              </p>
              <div className='text-lightgray'>
                <ChevronRight className='size-5' />
                <span className='sr-only'>Edit</span>
              </div>
            </div>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <p>{address.name}</p>
              <p className='text-lightgray'>{address.phoneNumber}</p>
            </div>
          </div>
        ) : (
          <p className='pl-8 font-medium text-lightgray'>
            Adicione um endereço de entrega
          </p>
        )}
      </button>
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
