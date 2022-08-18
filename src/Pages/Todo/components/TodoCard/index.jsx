import { Box, Button, Container, Flex, FormControl, FormErrorMessage, Input, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { FiTrash } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { changeEditState, completeTodo, editTodo, removeTodo } from '../../../../redux/slices/todoSlice'
import { deleteTodo, patchTodo } from '../../../../api'


export const TodoCard = ({ todo }) => {
  const localId = localStorage.getItem('uid')

  const [loading, setLoading] = React.useState(false)
  const { title, des, date, id, completed, editState } = todo

  const dispatch = useDispatch()


  const {
    register, 
    handleSubmit, 
    formState: 
      {
        errors,
      },
  } = useForm() 

  const onDelete = () => {
    dispatch(removeTodo(id))
    const request = deleteTodo(localId, id)

    request
      .then(res => console.log(res))
  }

  const onEdit = data => {
    dispatch(editTodo({data, id}))
  }

  React.useEffect(() => {
    setLoading(true)
    const request = patchTodo(todo, localId)
    
    request
      .finally(setLoading(false))

  }, [dispatch, todo, localId])



  return (
      <Container key={id} borderWidth='1px' borderRadius='lg' bg={completed ? "whatsapp.100" : "#fff"}>
      {
        editState ?
          <Flex flexDirection='column'>
            <FormControl mt="10px" isInvalid={!!errors.title}>
              <Input 
                variant="flushed"
                borderBottomColor="cyan.500"
                autoFocus
                defaultValue={title}
                {...register('title', {
                  required: 'Обязательное поле'
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
          
            <FormControl mt="10px" isInvalid={!!errors.des}>
                <Textarea variant="flushed"
                  defaultValue={des}
                  borderBottomColor="cyan.500"
                  {...register('des')}
                />
                <FormErrorMessage>{errors.des?.message}</FormErrorMessage>
              </FormControl>

            <Flex justifyContent="space-between" m="10px 0px 10px 0px">
              <Box color="GrayText"></Box>
              <Flex>
                <Button 
                  disabled 
                  mx='5px'
                  colorScheme="red" 
                ><FiTrash size={25}/></Button>

                <Button  
                  mx='5px' 
                  colorScheme="blue" 
                  onClick={handleSubmit(data => dispatch(onEdit(data)))}
                ><FiEdit size={25}/></Button>

                <Button 
                  disabled mx='5px' 
                  colorScheme="green"
                ><BsCheckLg color='#fff' size={25}/></Button>
              </Flex>
            </Flex>
        </Flex> : 

        <Flex flexDirection='column'>
          <Box fontSize={20} fontWeight="bold" my="10px">{title}</Box>
        
          <Text whiteSpace="pre-line" fontSize="18px">{des}</Text>

          <Flex justifyContent="space-between" m="1px 0px 10px 0px">
            <Box color="GrayText">{date}</Box>
            <Flex>
              <Button 
                mx='5px'
                colorScheme="red" 
                disabled={loading}
                onClick={onDelete}
                ><FiTrash size={25}/>
              </Button>

              <Button 
                mx='5px' 
                colorScheme="blue"
                disabled={loading} 
                onClick={() => dispatch(changeEditState(id))}
                ><FiEdit size={25}/>
              </Button>

              <Button 
                mx='5px' 
                disabled={loading}
                colorScheme="green"
                onClick={() => dispatch(completeTodo(id))}
                ><BsCheckLg color='#fff' size={25}/>
              </Button>

            </Flex>
          </Flex>
        </Flex>
      }

    </Container>

  )
}