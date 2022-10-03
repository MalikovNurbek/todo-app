import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers, postUser } from '../../../api'
import { parseJSON } from '../../../helpers'

export const useAuth = () => {

  const navigate = useNavigate()
  const goToTodos = () => navigate('/todos')


  const [users, setUsers] = React.useState([])

  const handleAuth = () => {
    const auth = getAuth()

    const provider = new GoogleAuthProvider()

    return signInWithPopup(auth, provider)
  }

  const postData = (data, uid, onClose) => {
    const request = postUser(data, uid)

    request
      .then(() => onClose())

  }


  React.useEffect(() => {
    const request = getUsers()
    request
      .then(res => {
        const data = res.data
        if (data) {
          setUsers(parseJSON(data))
        }
      })
  }, [])

  return {
    handleAuth,
    postData,
    goToTodos,
    users,
  }
}

