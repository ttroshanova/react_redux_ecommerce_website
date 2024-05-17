import React, { useEffect, useContext, useRef } from 'react'
import UserContext from './UserContext'
import * as Iolos from "react-icons/io"
import {StyleRoot} from 'radium';


const Cart = () => {
    const { items, removeFromCart, quantitySum } = useContext(UserContext);
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
            observer.observe(cartItemsSplide.current.children[cartItemsSplide.current.children.length - 1])
    })

    const addContent = () => {
        if(quantitySum !== 1) {
            return `You have ${quantitySum} items in you cart`
        } else if(quantitySum === 1){
            return `You have ${quantitySum} item in you cart`
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

    const cartItemsSplideStyles = {
        height: '60%',
        display: 'flex',
        gap: '10px',
        transition: '0.3s cubic-bezier(0.2, 0.67, 0.58, 0.99)',
        '@media (max-width: 414px)': {
            height: '80%',
            gap: '0',
            transition: '0.3s cubic-bezier(0.31, 0.5, 0.67, 0.87)',
            width: `calc(${items.length} * (100vw - (2 * 27.49px)))`
        }
    }

        const itemContainerStyles = {
        height: '100%',
        width: 'calc(100vw/5)',
        minWidth: '300px',
        paddingBottom: '10px',
        '@media (max-width: 414px)': {
            width: 'calc(100vw - (2 * 27.49px))'
        }
    }

  return (
    <div className='cart'>
        <h3>{addContent()}</h3>
        {quantitySum > 0 && (
            <StyleRoot>
                <div className='cart-items-container' ref={cartItemsContainer}>
                    <Iolos.IoIosArrowBack className='arrow-left' onClick={moveLeft}/>
                    <div className="cart-items-inner-container" ref={cartItemsInnerContainer}>
                        <div className='cart-items-splide' style={cartItemsSplideStyles} ref={cartItemsSplide}>
                            {items.map((item, index) => (
                            <div className='item-container' key={index} style={itemContainerStyles}>
                                <div className='cart-img-container' ref={cartImgContainer}>
                                    <img src={item.source} alt={item.name}/>
                                </div>
                                <div className="cart-content">
                                    <div className="cart-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-price">${item.price}</p>
                                        <p className="item-quantity">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="btn-container">
                                        <button className="remove-item" onClick={() => removeFromCart(item)}>
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
