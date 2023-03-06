import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'

const Header: React.FC = () => {
  const { data: session } = useSession()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const router = useRouter()
  return (
    <header>
      <div className='flex items-center p-1 flex-grow py-2 bg-amazon_blue'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <img
            onClick={() => router.push('/')}
            src='https://links.papareact.com/f90'
            alt='logo'
            className='object-contain cursor-pointer h-14 w-100'
          />
        </div>

        <div className='hidden md:flex items-center ml-4 h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer'>
          <input
            className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4'
            type='text'
          />
          <MagnifyingGlassIcon className='h-12 p-4' />
        </div>

        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div
            onClick={!session ? () => signIn('google') : () => signOut()}
            className='link'
          >
            <p>{session ? `Hello, ${session.user?.name!}` : 'Sign In'}</p>
            <p className='font-bold md:text-sm'>Account & Lists</p>
          </div>

          <div className='link' onClick={() => router.push('/orders')}>
            <p>Returns</p>
            <p className='font-bold md:text-sm'>& Orders</p>
          </div>

          <Link href='/cart' className='relative link flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold hover:bg-yellow-500'>
              {cartItems.length}
            </span>
            <ShoppingCartIcon className='h-10' />

            <p className='hidden md:inline font-bold md:text-sm mt-2'>Basket</p>
          </Link>
        </div>
      </div>

      <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
        <p className='link flex items-center'>
          <Bars3Icon className='h-6 mr-1' />
          All
        </p>

        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Buiseness</p>
        <p className='link'>Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header
