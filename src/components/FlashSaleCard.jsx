export default function FlashSaleCard() {
  return (
    <div className='relative my-4 flex h-32 w-full justify-between overflow-hidden rounded-lg bg-gray-900 px-6 py-4 text-gray-50 sm:h-40 md:h-48'>
      <div className='absolute inset-0 size-full bg-[linear-gradient(to_right,rgba(255,255,255,0.085)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.085)_1px,transparent_1px)] bg-[size:36px_36px]' />
      <div className='relative flex h-full shrink-0 flex-col justify-between'>
        <div>
          <p className='text-xl sm:text-2xl md:text-3xl xl:text-4xl'>
            Oferta Relâmpago
          </p>
          <p className='text-sm text-gray-300 md:text-base xl:text-lg'>
            Até 50% de desconto.{' '}
            <span className='hidden text-xs leading-none text-gray-400 sm:inline-block md:text-sm xl:text-base'>
              Tempo limitado.
            </span>
          </p>
        </div>
        <button className='w-fit rounded-lg bg-brand px-6 py-1.5 text-sm transition-colors hover:bg-brand-dark md:text-base lg:px-8 lg:py-2'>
          Ver ofertas
        </button>
      </div>
      <img
        className='absolute right-0 top-1/2 w-1/2 -translate-y-1/2 lg:w-1/2'
        src='/images/hoodie.png'
        alt='Hoodie'
      />
    </div>
  )
}
