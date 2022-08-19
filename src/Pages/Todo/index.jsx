import {  Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getTodos } from '../../api'
import { parseJSON } from '../../helpers'
import { NewTask } from './components/NewTask'
import { TodoCard } from './components/TodoCard'

import { useSelector, useDispatch } from 'react-redux'
import { clearData, selectTodos, setTodos } from '../../redux/slices/todoSlice'

export const TodosPage = () => {
  
  const localId = localStorage.getItem('uid')
  // const [todos, setTodos] = React.useState([])


  
  const navigate = useNavigate()
  const goToAuth = () => navigate('/')

  const logout = () => {
    localStorage.removeItem('uid')
    goToAuth()
    dispatch(clearData())
  }

  const todos = useSelector(selectTodos)

  const dispatch = useDispatch()
  


  React.useEffect(() => {
    const request = getTodos(localId)

    request
      .then(res => {
        if (res.data) {
          dispatch(setTodos(parseJSON(res.data)))
        }
      })
  }, [dispatch, localId])


   
  if (!localId) return goToAuth()


  return (
    <div>
      <Button variant="solid" colorScheme="red" onClick={logout}>logout</Button>


      <NewTask setTodos={setTodos}/>

      <Flex gap={10} p="20px 3%" flexWrap="wrap" align="flex-start" justify="stretch">
        {
          todos ? todos.map(todo => (
            <TodoCard todo={todo} key={todo.id} setTodos={setTodos}/>
          )).reverse() : (<h1>У вас нет актуальных задач.</h1>)
        }
      </Flex>

      
    </div>
  )
}