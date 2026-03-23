import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cartpage from './pages/Cartpage'
import Checkoutpage from './pages/Checkoutpage'
import Navbar from './components/Navbar'
import Orderpage from './pages/Orderpage'
import Register from './pages/Register'
import Login from './pages/Login'
import Privateroute from './utils/Privateroute'

const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>

        <Route element={<Privateroute/>}>
           <Route path='/home' element={<Home />}></Route>
        <Route path='/cart' element={<Cartpage />}></Route>
        <Route path='/checkout' element={<Checkoutpage />}></Route>
        <Route path='/orders' element={<Orderpage />}></Route>

        </Route>

       


      </Routes>
    </BrowserRouter>

  </>
}

export default App