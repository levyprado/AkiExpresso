import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import ProductDetail from '../components/ProductDetail'
import ProductsList from '../components/ProductsList'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setData(data.filter(data => !data.images[0].startsWith('[')))
      })
  }, [])

  return (
    <div className='bg-gray-50 text-gray-950'>
      <Header />
      <Hero />
      <ProductDetail />
      <ProductsList products={data} />
      <Nav />
    </div>
  )
}
