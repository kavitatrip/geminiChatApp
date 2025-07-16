import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/Login'
import ChatInput from './components/ChatDashboard'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />}></Route>
      <Route path='/dashboard' element={<ChatInput />}></Route>
    </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
