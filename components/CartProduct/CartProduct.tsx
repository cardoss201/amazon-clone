import React from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { StarIcon } from '@heroicons/react/24/solid'
import { removeFromCart } from '@/Redux/slices/cartSlice/cartSlice'

type Props = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  hasPrime: boolean
  rating: number
}

const CartProduct: React.FC<Props> = ({
  id,
  title,
  image,
  price,
  description,
  category,
  hasPrime,
  rating,
}) => {
  const dispatch = useDispatch()

  const removeItem = (idx: number) => {
    dispatch(removeFromCart(idx))
  }
  return (
    <div className='grid grid-cols-5'>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        className='object-contain'
      />

      <div className='col-span-3 mx-5'>
        <p>{title}</p>
        <div className='flex'>
          {Array(rating)
            .fill(rating)
            .map((_, idx) => (
              <StarIcon key={idx} className='h-5 text-yellow-500' />
            ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{description}</p>

        <p>{price}€</p>

        {hasPrime && (
          <div className='flex items-center space-x-2 mt-2'>
            <img
              loading='lazy'
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt='prime logo'
            />
            <p className='text-xs text-gray-500'>FREE Next Day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col my-auto justify-self-end'>
        <button onClick={() => removeItem(id)} className='button'>
          Remove From Cart
        </button>
      </div>
    </div>
  )
}

export default CartProduct
