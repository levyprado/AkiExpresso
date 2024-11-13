import { Heart, Home, ShoppingCart, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className='fixed bottom-0 left-0 flex w-full items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-lightgray md:text-lg lg:hidden'>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'relative -ml-4 flex flex-1 flex-col items-center text-brand transition-colors'
            : 'relative -ml-4 flex flex-1 flex-col items-center transition-colors hover:text-brand'
        }
        to='/'
      >
        {({ isActive }) => (
          <>
            <div
              className={
                isActive
                  ? 'absolute -top-3.5 block h-[3px] w-1/2 rounded-lg bg-brand'
                  : 'hidden'
              }
            ></div>
            <Home />
            <p>Inicial</p>
          </>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'relative flex flex-1 flex-col items-center text-brand transition-colors'
            : 'relative flex flex-1 flex-col items-center transition-colors hover:text-brand'
        }
        to='/wishlist'
      >
        {({ isActive }) => (
          <>
            <div
              className={
                isActive
                  ? 'absolute -top-3.5 block h-[3px] w-1/2 rounded-lg bg-brand'
                  : 'hidden'
              }
            ></div>
            <Heart />
            <p>Salvos</p>
          </>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'relative flex flex-1 flex-col items-center text-brand transition-colors'
            : 'relative flex flex-1 flex-col items-center transition-colors hover:text-brand'
        }
        to='/cart'
      >
        {({ isActive }) => (
          <>
            <div
              className={
                isActive
                  ? 'absolute -top-3.5 block h-[3px] w-1/2 rounded-lg bg-brand'
                  : 'hidden'
              }
            ></div>
            <ShoppingCart />
            <p>Carrinho</p>
          </>
        )}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'relative -mr-4 flex flex-1 flex-col items-center text-brand transition-colors'
            : 'relative -mr-4 flex flex-1 flex-col items-center transition-colors hover:text-brand'
        }
        to='/profile'
      >
        {({ isActive }) => (
          <>
            <div
              className={
                isActive
                  ? 'absolute -top-3.5 block h-[3px] w-1/2 rounded-lg bg-brand'
                  : 'hidden'
              }
            ></div>
            <User />
            <p>Perfil</p>
          </>
        )}
      </NavLink>
    </nav>
  )
}
