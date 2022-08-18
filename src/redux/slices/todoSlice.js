import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}



export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    setTodos: (state, action) => {
      state.todos = action.payload
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          const newState = todo.completed
          todo.completed = !newState
        }
        return todo
      })
    },
    changeEditState: (state, action) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === action.payload) {
          const newState = todo.editState
          todo.editState = !newState
        }
        return todo
      })
    },
    editTodo: (state, action) => {
      const newData = action.payload.data
      console.log(action.payload)
      const id = action.payload.id
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          todo = {
            ...todo,
            des: newData.des,
            title: newData.title,
            editState: false,
          }
        }
        return todo
      })
    },
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload]
    }
  },
})

export const { setTodos, removeTodo, completeTodo, changeEditState, editTodo, addTodo } = todosSlice.actions
export const selectTodos = (state) => state.todos.todos 

export default todosSlice.reducer