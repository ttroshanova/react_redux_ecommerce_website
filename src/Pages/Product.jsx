import React, { useEffect } from 'react'
import UserContext from './UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const Product = ({ index, itemSrc, name, price }) => {
    const { addToCart } = useContext(UserContext);
    let navigate = useNavigate();

    const showProduct = () => {
      navigate(`/products/${index}`)
    }
    useEffect(()=> {
      gsap.to('.product', {
        y: 0,
        opacity: 1,
        stagger: 0.3
      })
    },[])

    return (
    <div className="product">
      <div className="background" onClick={() => showProduct()}></div>
      <figure>
        <img src={itemSrc} alt="product"/>
      </figure>
      <div className="item-content">
        <div className='item-description'>
          <p className="item-name">{name}</p>
          <p className="item-price">${price}</p>
        </div>
        <div className='products-btn-container'>
          <button className="add" onClick={() => addToCart(index, name, price, itemSrc)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product