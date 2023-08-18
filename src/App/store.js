import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './Counter/Counter'

export const store = configureStore({
  reducer: {
    counter: counterSlice
  },
})