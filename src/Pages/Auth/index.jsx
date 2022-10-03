import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from './hooks/UseAuth'
import { FcGoogle } from 'react-icons/fc'

export const Auth = () => {
  const isAuth = localStorage.getItem('uid')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [user, setUser] = React.useState([])

  const {
    handleAuth,
    postData,
    goToTodos,
    users,
   } = useAuth()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
    setError,
  } = useForm()


  const onAuth = () => {
    handleAuth()
      .then(res => {
        const tokenResponse = res._tokenResponse
        const user = res.user
        const isNewUser = tokenResponse.isNewUser

        setUser({
          email: tokenResponse.email,
          firstName: tokenResponse.firstName,
          lastName: tokenResponse.lastName,
          userId: tokenResponse.localId,
          photoUrl: tokenResponse.photoUrl,
        })
        if (isNewUser) {
          return onOpen()
        }
        const userId = user.uid
        localStorage.setItem('uid', userId)
        const isRegisteredUser = users?.find(item => item.userId === userId)

        if (!isRegisteredUser) return onOpen()

        goToTodos()
      })

  }


  const onSubmit = (data) => {

    const newData = {
      ...user,
      login: data.login,
    }

    const isUnique = !!users?.find(({ login }) => login === data.login)

    if (isUnique) {
      return setError('login', {
        type: 'validate',
        message: 'Такой логин уже существует!',
      })
    }
    postData(newData, newData.userId, onClose)
    localStorage.setItem('uid', newData.userId)
    goToTodos()


  }

  if (isAuth) return goToTodos()

  return (
    <>
      <div className="text-center w-full h-screen flex items-center justify-center flex-col">
        <div className="p-8 rounded bg-slate-700">
          <Text className="text-3xl text-white mb-6">Приветствую тебя! <br /> Зайди в свой аккаунт и начинай планировку задач!</Text>
          <IconButton onClick={onAuth} icon={<FcGoogle size={80} />} size={80} />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Регистрация Пользователя</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!!errors.login}>
              <FormLabel>Ваш логин</FormLabel>
              <Input
                placeholder="Логин"
                {...register('login', {
                  required: 'Обязательное поле!',
                })}
              />
              <FormErrorMessage>{errors.login?.message}</FormErrorMessage>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit(onSubmit)}
            >Зарегистрироваться</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}