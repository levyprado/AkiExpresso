import { ArrowLeft } from 'lucide-react'

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='rounded-full border border-gray-300 bg-white p-2'
    >
      <ArrowLeft className='size-6' />
      <span className='sr-only'>Back</span>
    </button>
  )
}
