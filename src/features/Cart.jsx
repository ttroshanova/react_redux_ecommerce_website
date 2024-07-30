import React, { useEffect, useRef } from 'react'
import * as Iolos from "react-icons/io"
import {StyleRoot} from 'radium';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, addToCart, removeFromCart, clearCart, getTotalQuantity } from './productsSlice'

const Cart = () => {
    const items = useSelector(state => state.cart.cartItems)
    const cartTotalQuantity = useSelector(state => state.cart.cartTotalQuantity)
    const dispatch = useDispatch();
    const cartItemsSplide = useRef();
    const cartItemsContainer = useRef();
    const incrementor = useRef(0);
    const cartItemsInnerContainer = useRef();
    const lastItem = items[items.length - 1];
    const cartImgContainer = useRef();

    const enableButtonForward = () => {
        const arrowForward = cartItemsContainer.current.lastElementChild;
        arrowForward.style.pointerEvents = 'all';
        arrowForward.style.color = '#000';    
    }
    
    const disableButtonForward = () => {
        const arrowForward = cartItemsContainer.current.lastElementChild;
        arrowForward.style.pointerEvents = 'none';
        arrowForward.style.color = '#bebebe';
    }
  
    const enableButtonBack = () => {
      const arrowBack = cartItemsContainer.current.firstElementChild;
      arrowBack.style.pointerEvents = 'all';
      arrowBack.style.color = '#000';    
    }
  
    const disableButtonBack = () => {
        const arrowBack = cartItemsContainer.current.firstElementChild;
        arrowBack.style.pointerEvents = 'none';
        arrowBack.style.color = '#bebebe';
    }
  
    useEffect(() => {
        if(!cartItemsSplide?.current) return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(!lastItem && !entry.isIntersecting) {
                    enableButtonForward();
                } else if(lastItem && entry.isIntersecting) {
                    disableButtonForward();
                }
            })
        }, {
            root: cartItemsInnerContainer.current,
            threshold: 1
        })
        if(cartItemsSplide.current.children[cartItemsSplide.current.children.length - 1]) {
            observer.observe(cartItemsSplide.current.children[cartItemsSplide.current.children.length - 1])
        }
    })

    useEffect(() => {
        dispatch(getTotalQuantity())
    },[dispatch, items])

    const addContent = () => {
        if(cartTotalQuantity !== 1) {
            return `You have ${cartTotalQuantity} items in you cart`
        } else {
            return `You have ${cartTotalQuantity} item in you cart`
        }
    }
  
    const moveLeft = () => {
        enableButtonForward();
        incrementor.current = incrementor.current - 1;
        if(incrementor.current === 0) {
            disableButtonBack();
        }
        const itemContainerWidth = cartItemsSplide.current.firstElementChild.clientWidth;
        cartItemsSplide.current.style.transform = `translateX(-${itemContainerWidth * incrementor.current}px)`;
        }

    const moveRight = () => {
        enableButtonBack();
        incrementor.current = incrementor.current + 1;
        const itemContainerWidth = cartItemsSplide.current.firstElementChild.clientWidth;
        cartItemsSplide.current.style.transform = `translateX(-${itemContainerWidth * incrementor.current}px)`;
        if(incrementor.current === items.length - 1){
            disableButtonForward();
        }
    }

    const itemContainerStyles = {
        width: 'calc(100vw - (2 * 27.49px))',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '@media screen and (min-width: 431px)': {
          width: 'calc(100vw/5)',
          height: '100%',
          padding: '0',
          minWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        '@media screen and (min-width: 344px)': {
            padding: '15px 0',
          }
      }

    const cartItemsSplideStyles = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        transition: '0.3s cubic-bezier(0.31, 0.5, 0.67, 0.87)',
        width: `calc((100vw - (2 * 27.49px)) * ${items.length})`,
        height: '100%',
        '@media screen and (min-width: 431px)': {
          height: '60%',
          width: `calc(${items.length} * ${itemContainerStyles.width})`,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          transition: '0.3s cubic-bezier(0.2, 0.67, 0.58, 0.99)'
        },
        '@media screen and (min-width: 530px)': {
          height: '80%',
          width: `calc(${items.length} * ${itemContainerStyles.width})`,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          transition: '0.3s cubic-bezier(0.2, 0.67, 0.58, 0.99)'
        },
        '@media screen and (min-width: 600px)': {
          height: '70%',
          width: `calc(${items.length} * ${itemContainerStyles.width})`,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          transition: '0.3s cubic-bezier(0.2, 0.67, 0.58, 0.99)'
        },
        '@media screen and (min-width: 1700px)': {
          height: '80%',
          width: `calc(${items.length} * ${itemContainerStyles.width})`,
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          transition: '0.3s cubic-bezier(0.2, 0.67, 0.58, 0.99)'
        }
      }

  return (
    <div className='cart'>
        <h3>{addContent()}</h3>
        <div className="clear-cart">
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
        {(cartTotalQuantity > 0) && (
            <StyleRoot>
                <div className='cart-items-container' ref={cartItemsContainer}>
                    <Iolos.IoIosArrowBack className='arrow-left' onClick={moveLeft}/>
                    <div className="cart-items-inner-container" ref={cartItemsInnerContainer}>
                        <div className='cart-items-splide' style={cartItemsSplideStyles} ref={cartItemsSplide}>
                            {items.map((item) => (
                            <div className='item-container' key={item.id} style={itemContainerStyles}>
                                <div className='cart-img-container' ref={cartImgContainer}>
                                    <img src={item.src} alt={item.name}/>
                                </div>
                                <div className="cart-content">
                                    <div className="cart-info">
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>Quantity</p>
                                        <div className="quantity">
                                            <button onClick={() => dispatch(decreaseCartQuantity(item.id))}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => dispatch(addToCart(item))}>+</button>
                                        </div>
                                    </div>
                                    <div className="btn-container">
                                        <button className="remove-item" onClick={() => dispatch(removeFromCart(item.id))}>
                                            <span>Remove</span>
                                            <span>from cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <Iolos.IoIosArrowForward className='arrow-right' onClick={moveRight}/>
                </div>
            </StyleRoot>
        )}
    </div>
  )
}

export default Cart
