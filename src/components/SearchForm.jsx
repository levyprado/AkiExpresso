import { Search } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SearchForm({ ...props }) {
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.search) {
      searchInputRef.current.value = new URLSearchParams(location.search).get(
        'query',
      )
    }
  }, [location.search])

  const handleSubmit = e => {
    e.preventDefault()
    if (searchInputRef.current.value) {
      navigate(`/search?query=${searchInputRef.current.value}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full items-center overflow-hidden rounded-lg border border-gray-300 bg-white transition hover:shadow-sm hover:shadow-gray-300 has-[input:focus]:ring-2 has-[input:focus]:ring-lightgray'
    >
      <input
        ref={searchInputRef}
        className='w-full flex-1 py-2 pl-3 outline-none hover:placeholder:text-lightgray-dark'
        type='search'
        id='search'
        placeholder='Procure um produto...'
        {...props}
      />
      <button className='mr-1 flex size-10 items-center justify-center lg:size-8 lg:w-12 lg:rounded-md lg:bg-brand'>
        <Search className='text-brand lg:size-5 lg:text-white' />
        <span className='sr-only'>Procurar</span>
      </button>
    </form>
  )
}
