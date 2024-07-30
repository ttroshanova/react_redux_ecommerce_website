import React from 'react'
import Product from './Product'
import { Items } from './ProductsData'

const Products = () => {
  return (
    <div className="products-container">
          <div className='products'>
        {Items.map(product => (
            <Product key={product.id}
            product={product}
            />
        ))}
    </div>
    </div>
  )
}

export default Products