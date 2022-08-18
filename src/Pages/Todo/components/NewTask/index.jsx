import { Box, Button, Container, Flex, FormControl, Input, FormErrorMessage, Textarea } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createTodo, getTodos } from '../../../../api'
import { parseJSON } from '../../../../helpers'
import { addTodo, setTodos } from '../../../../redux/slices/todoSlice'
export const NewTask = () => {

  const localId = localStorage.getItem('uid')

  const {
    register, 
    handleSubmit, 
    formState: {
      errors
    },
    reset
  } = useForm()

  const dispatch = useDispatch()

  const onSumbit = (data) => {
  const todoId = Date.now() 

    const newData = {
      ...data,
      editState: false,  
      completed: false,
      date: new Date().toLocaleString(),
      id: todoId,
    }
    dispatch(addTodo(newData))

    const request = createTodo(newData, localId, todoId)

    request
      .then(() => {
        reset({
          title: '',
          des: '',
        })
      })
      .then(() => {
        const request = getTodos(localId)

        request
          .then(res => dispatch(setTodos(parseJSON(res.data))))
      })
  }

  return (
    <Container borderWidth='1px' borderRadius='lg' m="3% auto" bg="#fff">
      <Flex flexDirection='column'>
        <Box fontSize="24px" fontWeight="bold" textAlign="center" my="15px">Create new task</Box>

      <FormControl fontSize={20} my="10px" isInvalid={!!errors.title}>
            <Input 
              placeholder="Title"
              {...register('title', {
                required: 'Обязательное поле'
              })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

        <FormControl mb="10px" isInvalid={!!errors.des}>
            <Textarea
              placeholder="Description"
              {...register('des')}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

        <Button  my='10px' colorScheme="blue" onClick={handleSubmit(onSumbit)}>New task</Button>

      </Flex>
    </Container>
  )
}