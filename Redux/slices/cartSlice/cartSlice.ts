import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/Redux/store'

type CartItems = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  hasPrime: boolean
  rating: number
}

export interface CartState {
  items: CartItems[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItems>) => {
      state.items = [...state.items, action.payload]
    },
    clearCart: (state) => {
      state.items = []
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idx = state.items.findIndex((item) => item.id === action.payload)

      let newCart = [...state.items]

      if (idx >= 0) {
        newCart.splice(idx, 1)
      }

      state.items = newCart
    },
  },
})

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions

export const selectTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price, 0)

export default cartSlice.reducer
