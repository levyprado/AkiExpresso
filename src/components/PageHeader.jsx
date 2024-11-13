import BackButton from './BackButton'

export default function PageHeader({ page, onClick }) {
  return (
    <div className='relative flex items-center justify-between py-3'>
      <BackButton onClick={onClick} />
      <h4 className='absolute left-1/2 -translate-x-1/2 text-xl font-medium lg:hidden'>
        {page}
      </h4>
    </div>
  )
}
