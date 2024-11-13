import { useEffect, useState } from 'react'
import { formatPrice } from '../utils'

export default function ShippingOption({
  id,
  label,
  arrival,
  price,
  shippingOptions,
  selectedShippingOption,
  setSelectedShippingOption,
}) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setChecked(id === selectedShippingOption.id)
  }, [id, selectedShippingOption])

  return (
    <label
      htmlFor={id}
      className='relative flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-4 py-3 transition-colors has-[:checked]:border-l-4 has-[:checked]:border-l-brand-dark'
    >
      <input
        className='absolute inset-0 cursor-pointer appearance-none opacity-0'
        type='radio'
        name='shippingOption'
        id={id}
        checked={checked}
        onChange={() =>
          setSelectedShippingOption(shippingOptions.find(o => o.id === id))
        }
      />
      <div>
        <p className='font-sm text-sm font-medium leading-tight'>{label}</p>
        <span className='text-xs font-medium leading-tight text-lightgray'>
          {arrival}
        </span>
      </div>
      <p className='font-medium'>{formatPrice(price)}</p>
    </label>
  )
}
