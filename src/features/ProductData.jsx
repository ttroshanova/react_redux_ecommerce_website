import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Items } from './ProductsData'
import gsap from 'gsap'
import { useDispatch } from 'react-redux';
import {addToCart, getTotalQuantity} from './productsSlice'


const ProductData = () => {
  const { index } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.to('.descr-img', {opacity: 1, x: 0})
    gsap.to('.descr-item', {
      y: 0, 
      opacity: 1,
      stagger: 0.16
    })
  },[])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    dispatch(getTotalQuantity())
  }

  return (
    <div className='product-data-container'>
      <div className="product-data-inner">
      <div className="img-container">
          <img src={Items[index].src} alt={Items[index].name} className='descr-img'/>
      </div>
      <div className="content">
          <h2 className='descr-item'>{Items[index].name}</h2>
          <ul className='product-description'>
            {Items[index].description.map((item) => (
              <li key={index} className='descr-item'><span className='dot'></span>{item}</li>
            ))}
          </ul>
          <button type='button' className='descr-item'
          onClick={() => handleAddToCart(Items[index])}>
            Add to cart
          </button>
      </div>
      </div>
    </div>
  )
}

export default ProductData