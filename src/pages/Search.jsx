import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import ProductsList from '../components/ProductsList'
import SearchForm from '../components/SearchForm'
import { useLocation } from 'react-router-dom'
import EmptyMessage from '../components/EmptyMessage'
import { ActiveProductContext } from '../context/ActiveProductProvider'
import ProductDetail from '../components/ProductDetail'

export default function Search() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const { activeProduct } = useContext(ActiveProductContext)

  const searchParams = new URLSearchParams(location.search)
  const category = searchParams.get('category')
  const query = searchParams.get('query')

  useEffect(() => {
    let apiUrl = 'https://api.escuelajs.co/api/v1/products'

    if (query) {
      // Filtra produtos pelo termo de busca
      apiUrl += `/?title=${query}`
    }

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        setLoading(false)
        console.log(data)

        if (category) {
          setProducts(
            data.filter(
              data =>
                data.category.name === category &&
                !data.images[0].startsWith('['),
            ),
          )
        } else {
          setProducts(data.filter(data => !data.images[0].startsWith('[')))
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      }
    }

    fetchProducts()
  }, [category, query])

  return (
    <>
      <div className='h-dvh bg-gray-50'>
        <Header />
        <div className='mx-auto grid max-w-screen-xl grid-rows-[auto_1fr] lg:pt-24 xl:pt-28 2xl:pt-32'>
          <div className='mt-1 px-4 lg:hidden'>
            <SearchForm autoFocus />
          </div>
          <div className='overflow-y-auto py-2'>
            {loading && (
              <p className='text-center text-lg font-medium text-lightgray'>
                Procurando...
              </p>
            )}
            {!loading && products.length === 0 && (
              <div className='mt-4'>
                <EmptyMessage message='Nenhum produto encontrado.' />
              </div>
            )}
            <ProductsList products={products} />
          </div>
        </div>
        <Nav />
      </div>
      {activeProduct && <ProductDetail />}
    </>
  )
}
