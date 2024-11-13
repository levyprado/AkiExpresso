import { forwardRef } from 'react'

export const FormInput = forwardRef(function FormInput({ ...props }, ref) {
  return (
    <input
      ref={ref}
      className='w-full rounded-lg border-2 border-gray-200 p-2 outline-none transition-colors placeholder:text-sm focus:ring-2 focus:ring-lightgray disabled:text-lightgray data-[error="true"]:border-red-500 [&:not(:placeholder-shown)]:invalid:border-red-500'
      type={props.type || 'text'}
      required
      {...props}
    />
  )
})
