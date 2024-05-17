import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Pages/Nav';
import Products from './Pages/Products';
import ProductData from './Pages/ProductData';
import Cart from './Pages/Cart';
import { ContextProvider } from './Pages/UserContext';
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
     <ContextProvider>
       <Nav hidden={hidden}/>
       <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='products/:index' element={<ProductData/>}/>
          <Route path='cart' element={<Cart/>}/>
       </Routes>
       </ContextProvider>
     </Router>
    </div>
  );
}

export default App;

