import { useId } from 'react'

export default function PaymentOption({ icon, label, ...props }) {
  const id = useId()
  return (
    <label
      htmlFor={id}
      className='relative flex size-20 flex-col items-center justify-center gap-0.5 rounded-lg border-2 border-gray-200 bg-white transition-colors checked:border-brand has-[:checked]:border-brand has-[:focus-visible]:border-brand-light/70'
    >
      <input
        className='absolute inset-0 appearance-none opacity-0'
        type='radio'
        name='payment'
        defaultChecked={label === 'Pix'}
        id={id}
        {...props}
      />
      <span className='size-8 text-brand'>{icon}</span>
      <p className='text-center text-sm font-medium leading-none'>{label}</p>
    </label>
  )
}
