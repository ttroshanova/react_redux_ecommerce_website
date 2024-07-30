import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useDispatch } from 'react-redux'
import {addToCart, getTotalQuantity} from './productsSlice'

const Product = ({ product }) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
      dispatch(getTotalQuantity())
    }

    const showProduct = () => {
      navigate(`/products/${product.id}`)
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
        <img src={product.src} alt="product"/>
      </figure>
      <div className="item-content">
        <div className='item-description'>
          <p className="item-name">{product.name}</p>
          <p className="item-price">${product.price}</p>
        </div>
        <div className='products-btn-container'>
          <button className="add" onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product