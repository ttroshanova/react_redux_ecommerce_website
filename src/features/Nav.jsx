import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Nav = ({hidden}) => {
    const { cartTotalQuantity } = useSelector(state => state.cart)

  return (
    <>
    <div className={hidden ? 'nav hidden' : 'nav'}>
        <Link to='/'>
            Logo
        </Link>
        <Link to='/cart'>
            Cart({cartTotalQuantity})
        </Link>
    </div>
    <Outlet/>
    </>
  )
}

export default Nav