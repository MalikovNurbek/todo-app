import { Box, Button, Container, Flex, FormControl, Input, FormErrorMessage, Textarea, FormLabel } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createTodo, getTodos } from '../../../../api'
import { parseJSON } from '../../../../helpers'
import { addTodo, setTodos } from '../../../../redux/slices/todoSlice'
export const NewTask = () => {

  const localId = localStorage.getItem('uid')
  const [isLoading, setIsloading] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    reset,
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    reset({
      title: '',
      des: '',
    })
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
    setIsloading(true)
    request
      .then(() => {
        const request = getTodos(localId)

        request
          .then(res => dispatch(setTodos(parseJSON(res.data))))
      })
      .finally(() => setIsloading(false))
  }

  return (
    <Container borderWidth="1px" borderRadius="lg" m="3% auto" bg="#fff">
      <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection="column">
        <Box fontSize="24px" fontWeight="bold" textAlign="center" my="15px">Create new task</Box>

      <FormControl fontSize={20} my="10px" isInvalid={!!errors.title}>
            <FormLabel>Заголовок задач*</FormLabel>
            <Input
              disabled={isLoading}
              placeholder="Title"
              {...register('title', {
                required: 'Обязательное поле',
              })}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

        <FormControl mb="10px" isInvalid={!!errors.des}>
            <Textarea
              disabled={isLoading}
              placeholder="Description"
              {...register('des')}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

        <Button
          my="10px"
          colorScheme="blue"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >New task</Button>

      </Flex>
      </form>
    </Container>
  )
}