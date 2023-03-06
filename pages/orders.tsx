import React from 'react'
import db from '@/firebase'
import { collection } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import Header from '@/components/Header/Header'
import moment from 'moment'

const orders = () => {
  const { data: session } = useSession()

  const [value, loading] = useCollectionData(
    session && collection(db, 'users', session.user?.email!, 'orders')
  )

  return (
    <div>
      <Header />

      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
          Your Orders
        </h1>

        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>sign in to see orders</h2>
        )}

        {session &&
          value?.map((order) => (
            <div
              key={crypto.randomUUID()}
              className='relative border rounded-md'
            >
              <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
                <div>
                  <p className='font-bold text-xs'>ORDER PLACED</p>
                  <p>{moment.unix(order.timestamp).format('MM-DD-YYYY')}</p>
                </div>

                <div>
                  <p className='text-xs font-bold'>TOTAL</p>
                  <p>
                    {order.amount}€ Next Day Delivery - {order.amount_shipping}€
                  </p>
                </div>
                <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
                  {order.images.length} items
                </p>
              </div>

              <div className='p-5 sm:p-10'>
                <div className='flex space-x-6 overflow-x-auto'>
                  {order.images.map((img: string) => (
                    <img
                      key={crypto.randomUUID()}
                      className='h-20 object-contain sm:h-32'
                      src={img}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  )
}

export default orders
