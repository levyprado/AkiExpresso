import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import PageHeader from '../components/PageHeader'
import ProductsList from '../components/ProductsList'
import { useContext } from 'react'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import ProductDetail from '../components/ProductDetail'
import { SavedProductsContext } from '../context/SavedProductsProvider'
import EmptyMessage from '../components/EmptyMessage'
import Header from '../components/Header'

export default function Wishlist() {
  const { savedProducts } = useContext(SavedProductsContext)
  const navigate = useNavigate()
  const { activeProduct } = useContext(ActiveProductContext)

  return (
    <>
      <div className='bg-gray-50 px-4'>
        <div className='hidden lg:block'>
          <Header />
        </div>
        <div className='mx-auto grid h-dvh max-w-screen-lg grid-rows-[auto_1fr] lg:grid-rows-[auto_auto_1fr] lg:pt-24 xl:pt-28 2xl:pt-32'>
          <PageHeader page='Salvos' onClick={() => navigate('/')} />
          <div className='no-scrollbar overflow-y-scroll py-1'>
            {savedProducts.length === 0 && (
              <EmptyMessage message='Nenhum produto salvo.' />
            )}
            <ProductsList products={savedProducts} />
          </div>
          <Nav />
        </div>
      </div>
      {activeProduct && <ProductDetail />}
    </>
  )
}
