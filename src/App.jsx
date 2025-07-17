import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './components/Login'
import ChatInput from './components/ChatDashboard'
import Dashboard from './components/Dashboard'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
    </BrowserRouter>  
    </>
  )
}

export default App
