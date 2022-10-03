import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../redux/slices/todoSlice'
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})