import {createSlice} from '@reduxjs/toolkit'

export interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0
}

export const counterReducer = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    reset: (state) => {
      state.count = 0
    }
  }
})

export const {increment, decrement, reset} = counterReducer.actions
export default counterReducer.reducer