import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'Clothing', image: '/images/clothing.png', label: 'Roupas' },
  {
    name: 'Electronics',
    image: '/images/electronics.png',
    label: 'Eletrônicos',
  },
  { name: 'Furniture', image: '/images/furniture.png', label: 'Móveis' },
  { name: 'Shoes', image: '/images/shoes.png', label: 'Calçados' },
  {
    name: 'Miscellaneous',
    image: '/images/miscellaneous.png',
    label: 'Variados',
  },
]

export default function CategoryGrid() {
  const navigate = useNavigate()

  const handleCategoryClick = category => {
    navigate(`/search?category=${category}`)
  }

  return (
    <div className='grid grid-cols-6 gap-2.5 py-2 lg:grid-cols-5'>
      {categories.map(({ name, image, label }) => (
        <button
          key={name}
          onClick={() => handleCategoryClick(name)}
          className='col-span-2 flex flex-col items-center justify-between gap-1 rounded-lg bg-gray-100 p-1.5 md:gap-2 md:p-2 lg:col-span-1 lg:p-3 [&:nth-child(1)]:col-span-3 lg:[&:nth-child(1)]:col-span-1 [&:nth-child(2)]:col-span-3 lg:[&:nth-child(2)]:col-span-1'
          href='/'
        >
          <img
            className='w-9/12 flex-1 object-contain sm:w-8/12 md:w-5/12 lg:w-9/12'
            src={image}
            alt={label}
          />
          <h3 className='text-sm md:text-base'>{label}</h3>
        </button>
      ))}
    </div>
  )
}
