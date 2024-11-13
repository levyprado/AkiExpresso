import { useNavigate } from 'react-router-dom'
import Button from './Button'

export default function EmptyMessage({ message }) {
  const navigate = useNavigate()
  return (
    <div className='grid place-items-center space-y-2 text-center'>
      <span className='block text-xl text-lightgray-dark'>{message}</span>
      <Button onClick={() => navigate('/')}>Ver produtos</Button>
    </div>
  )
}
