import { Route, Routes } from 'react-router-dom'
import { Auth } from './Pages/Auth'
import { initializeApp } from 'firebase/app'
import { baseUrl, firebaseConfig } from './configs'
import axios from 'axios'
import { TodosPage } from './Pages/Todo'

initializeApp(firebaseConfig)

axios.defaults.baseURL = baseUrl

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Auth /> } />
      <Route path="/todos" element={ <TodosPage /> } />
    </Routes>
  )
}

export default App
