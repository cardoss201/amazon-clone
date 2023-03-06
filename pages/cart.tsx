import React from 'react'
import Header from '@/components/Header/Header'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import { clearCart, selectTotal } from '@/Redux/slices/cartSlice/cartSlice'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

import CartProduct from '@/components/CartProduct/CartProduct'
import { TrashIcon } from '@heroicons/react/24/outline'

const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const totalPrice = useSelector(selectTotal)
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  )

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    const checkoutSession = await axios.post('/api/checkout_sessions/', {
      items,
      email: session?.user?.email,
    })

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result?.error) {
      alert(result.error.message)
    }
  }

  return (
    <div className='bg-gray-100'>
      <Header />

      <main className='lg:flex max-w-screen-xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            className='object-contain'
            src='https://links.papareact.com/ikj'
            alt='picture'
            width={1020}
            height={250}
          />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Cart Is Empty' : 'Shopping Cart'}
            </h1>

            <div
              onClick={() => dispatch(clearCart())}
              className='flex justify-end flex-row cursor-pointer'
            >
              <button className='text-gray-500 text-sm'>Clear Cart</button>
              <TrashIcon className='h-6 w-6 text-gray-500' />
            </div>

            {items.map((item, idx) => (
              <CartProduct
                key={crypto.randomUUID()}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                description={item.description}
                category={item.category}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal {items.length} items:
                <span className='font-bold'>{totalPrice}€</span>
              </h2>
              <button
                onClick={createCheckoutSession}
                role='link'
                disabled={!session}
                className={`button mt-2 ${
                  !session
                    ? 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                    : ''
                }`}
              >
                {!session ? 'Sign In To Checkout' : 'Proceed To Checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Cart
