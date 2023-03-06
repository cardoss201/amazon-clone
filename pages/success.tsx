import React from 'react'

import Header from '@/components/Header/Header'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'

const success = () => {
  const router = useRouter()
  return (
    <div className='bg-gray-100 h-screen'>
      <Header />

      <main className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col p-10 bg-white'>
          <div className='flex items-center space-x-2 mb-5'>
            <CheckCircleIcon className='text-green-600 h-10 w-10' />
            <h1 className='text-3xl'>Your Order Has Been Confirmed</h1>
          </div>
          <p>
            Thank you for shopping at Amazon. We'll send a confirmation on
            shipped items, if you would like to check status of order please
            click link below
          </p>
          <button
            onClick={() => router.push('/orders')}
            className='button mt-8'
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  )
}

export default success
