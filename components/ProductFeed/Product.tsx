import React from 'react'
import Image from 'next/image'
import { RootState } from '@/Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/Redux/slices/cartSlice/cartSlice'

import { StarIcon } from '@heroicons/react/24/solid'

type Props = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const MAX_RATING = 5
const MIN_RATING = 1

const Product: React.FC<Props> = ({
  id,
  title,
  price,
  description,
  category,
  image,
}) => {
  const items = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const [rating, setRating] = React.useState<number>(1)
  const [hasPrime, setHasPrime] = React.useState<boolean>(true)

  React.useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )
    setHasPrime(Math.random() < 0.5)
  }, [])

  const addItem = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    }
    dispatch(addToCart(product))
  }
  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>
        {category}
      </p>

      <Image
        className='object-contain'
        src={image}
        alt='prudct image'
        height={200}
        width={200}
      />
      <h4 className='my-3'>{title}</h4>

      <div className='flex'>
        {Array(rating)
          .fill(rating)
          .map((_, idx) => (
            <StarIcon key={idx} className='h-5 text-yellow-500' />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>

      <div className='mb-5'>
        <p>{price}€</p>
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img
            className='w-12'
            src='https://links.papareact.com/fdw'
            alt='prime logo'
          />
          <p className='text-xs text-gray-500'>FREE Next Day Delivery</p>
        </div>
      )}

      <button onClick={addItem} className='mt-auto button'>
        Add To Basket
      </button>
    </div>
  )
}

export default Product
