import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './features/Nav';
import Products from './features/Products';
import ProductData from './features/ProductData';
import Cart from './features/Cart';
import { useState, useEffect } from 'react'

function App() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > lastScrollY){
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)

    return(() => {
      window.removeEventListener('scroll', handleScroll);
    })
  })
  return (
    <div className="app">
     <Router>
       <Nav hidden={hidden}/>
       <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='products/:index' element={<ProductData/>}/>
          <Route path='cart' element={<Cart/>}/>
       </Routes>
     </Router>
    </div>
  );
}

export default App;

