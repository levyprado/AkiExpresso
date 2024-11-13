import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cart from './pages/Cart.jsx'
import ActiveProductProvider from './context/ActiveProductProvider.jsx'
import ShippingAddressProvider from './context/ShippingAddressProvider.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Profile from './pages/Profile.jsx'
import SavedProductsProvider from './context/SavedProductsProvider.jsx'
import CartProductsProvider from './context/CartProductsProvider.jsx'
import Search from './pages/Search.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SavedProductsProvider>
        <CartProductsProvider>
          <ActiveProductProvider>
            <ShippingAddressProvider>
              <Home />
            </ShippingAddressProvider>
          </ActiveProductProvider>
        </CartProductsProvider>
      </SavedProductsProvider>
    ),
  },
  {
    path: 'cart',
    element: (
      <SavedProductsProvider>
        <CartProductsProvider>
          <ActiveProductProvider>
            <ShippingAddressProvider>
              <Cart />
            </ShippingAddressProvider>
          </ActiveProductProvider>
        </CartProductsProvider>
      </SavedProductsProvider>
    ),
  },
  {
    path: 'wishlist',
    element: (
      <SavedProductsProvider>
        <CartProductsProvider>
          <ActiveProductProvider>
            <Wishlist />
          </ActiveProductProvider>
        </CartProductsProvider>
      </SavedProductsProvider>
    ),
  },
  {
    path: 'profile',
    element: (
      <ActiveProductProvider>
        <CartProductsProvider>
          <ShippingAddressProvider>
            <Profile />
          </ShippingAddressProvider>
        </CartProductsProvider>
      </ActiveProductProvider>
    ),
  },
  {
    path: 'search',
    element: (
      <SavedProductsProvider>
        <ActiveProductProvider>
          <CartProductsProvider>
            <Search />
          </CartProductsProvider>
        </ActiveProductProvider>
      </SavedProductsProvider>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
