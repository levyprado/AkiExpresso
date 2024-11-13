import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Nav from '../components/Nav'
import { ChevronRight, Gift, Heart, ShoppingBag, Ticket } from 'lucide-react'
import Header from '../components/Header'
import CheckoutShippingAddress from '../components/CheckoutShippingAddress'

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className='h-dvh bg-gray-50'>
      <div className='hidden lg:block'>
        <Header />
      </div>
      <div className='relative flex h-1/4 w-full flex-col bg-gradient-to-b from-brand-dark to-brand lg:hidden'>
        <div className='absolute left-4 top-3'>
          <BackButton onClick={() => navigate('/')} />
        </div>
        <div className='absolute -bottom-16 left-1/2 size-32 -translate-x-1/2 space-y-1 rounded-full border-2 border-gray-200 bg-white'>
          <img
            className='h-full w-full rounded-full object-cover'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
            alt='Profile picture'
          />
          <span className='block text-center text-xl'>Usuário</span>
        </div>
      </div>
      <div className='bg-gray-50 px-4 pt-28 xl:pt-32 2xl:pt-36'>
        <div className='mx-auto flex max-w-screen-lg flex-col gap-3'>
          <CheckoutShippingAddress />
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4'>
            <Link className='flex min-h-16 items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3'>
              <div className='flex items-center gap-3'>
                <ShoppingBag className='shrink-0 text-yellow-500' />
                <span className='text-sm leading-4 lg:text-base'>
                  Comprar novamente
                </span>
              </div>
              <ChevronRight className='shrink-0 text-lightgray' />
            </Link>
            <Link
              className='flex min-h-16 items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3'
              to='/wishlist'
            >
              <div className='flex items-center gap-3'>
                <Heart className='shrink-0 text-brand' />
                <span className='text-sm leading-4 lg:text-base'>
                  Meus favoritos
                </span>
              </div>
              <ChevronRight className='shrink-0 text-lightgray' />
            </Link>
            <Link className='flex min-h-16 items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3'>
              <div className='flex items-center gap-3'>
                <Gift className='shrink-0 text-blue-500' />
                <span className='text-sm leading-4 lg:text-base'>Prêmios</span>
              </div>
              <ChevronRight className='shrink-0 text-lightgray' />
            </Link>
            <Link className='flex min-h-16 items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-3'>
              <div className='flex items-center gap-3'>
                <Ticket className='shrink-0 text-green-500' />
                <span className='text-sm leading-4 lg:text-base'>Cupons</span>
              </div>
              <ChevronRight className='shrink-0 text-lightgray' />
            </Link>
          </div>
        </div>
        <Nav />
      </div>
    </div>
  )
}
