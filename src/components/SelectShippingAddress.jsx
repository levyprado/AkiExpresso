import { useContext, useRef, useState } from 'react'
import Button from './Button'
import { FormInput } from './FormInput'
import { motion } from 'framer-motion'
import { ShippingAddressContext } from '../context/ShippingAddressProvider'

export default function SelectShippingAddress({ onCancel }) {
  const { setAddress } = useContext(ShippingAddressContext)

  const nameRef = useRef(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [cep, setCep] = useState('')
  const stateCityRef = useRef(null)
  const bairroRef = useRef(null)
  const streetRef = useRef(null)
  const houseNumberRef = useRef(null)
  const complementRef = useRef(null)
  const [error, setError] = useState(false)

  const handlePhoneNumberChange = e => {
    let value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos

    // Aplica o formato (XX) X XXXX-XXXX
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4')
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{1})(\d{4})/, '($1) $2 $3')
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{1})/, '($1) $2')
    } else if (value.length > 0) {
      value = value.replace(/^(\d{2})/, '($1')
    }

    setPhoneNumber(value)
  }

  const handleCepChange = e => {
    setError(false)
    if (e.target.value.length > 9) return

    let value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos

    // Aplica o formato XXXXX-XXX
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2')
    }

    setCep(value)

    // Quando o CEP tiver completo, pegar informacoes na api
    if (e.target.value.length === 9) {
      value = value.replace(/-/g, '')
      fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            setError(true)
          } else {
            stateCityRef.current.value = `${data.estado} - ${data.localidade}`
            bairroRef.current.value = data.bairro
            streetRef.current.value = data.logradouro
          }
        })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    setAddress({
      name: nameRef.current.value,
      phoneNumber,
      cep,
      stateCity: stateCityRef.current.value,
      bairro: bairroRef.current.value,
      street: streetRef.current.value,
      houseNumber: houseNumberRef.current.value,
      complement: complementRef.current.value,
    })
    onCancel()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className='fixed inset-0 z-20 flex items-center bg-black/50'
    >
      <div className='mx-auto w-11/12 max-w-lg rounded-lg bg-gray-50 p-4'>
        <p className='text-xl font-medium'>Novo Endereço de Entrega</p>
        <form onSubmit={handleSubmit} className='mt-4 space-y-3'>
          <div className='grid grid-cols-2 gap-3'>
            <FormInput ref={nameRef} placeholder='Nome Sobrenome' autoFocus />
            <FormInput
              placeholder='Telefone'
              inputMode='numeric'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength={15}
            />
          </div>
          <FormInput
            placeholder='CEP'
            maxLength={9}
            value={cep}
            onChange={handleCepChange}
            data-error={error ? 'true' : 'false'}
          />
          <FormInput
            ref={stateCityRef}
            placeholder='Estado - Cidade'
            disabled={true}
          />
          <FormInput ref={bairroRef} placeholder='Bairro' />
          <div className='grid grid-cols-[2fr_1fr] gap-3'>
            <FormInput ref={streetRef} placeholder='Rua/Avenida' />
            <FormInput
              ref={houseNumberRef}
              type='number'
              placeholder='Número'
              max='99999'
            />
          </div>
          <FormInput
            ref={complementRef}
            placeholder='Complemento'
            required={false}
          />
          <div className='grid grid-cols-[0.25fr_0.5fr] justify-end gap-2 pt-3'>
            <button
              type='button'
              onClick={onCancel}
              className='rounded-lg px-4 py-2 font-semibold hover:bg-gray-200'
            >
              Cancelar
            </button>
            <Button>Salvar</Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
