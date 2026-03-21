import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Cartpage from './pages/Cartpage'
import Checkoutpage from './pages/Checkoutpage'
import Navbar from './components/Navbar'
import Orderpage from './pages/Orderpage'

const App = () => {
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
  <Route path='/' element={<Home/>}></Route>
  <Route path='/cart' element={<Cartpage/>}></Route>
  <Route path='/checkout' element={<Checkoutpage/>}></Route>
  <Route path='/orders' element={<Orderpage/>}></Route>


  </Routes>
  </BrowserRouter>
  
  </>
}

export default App