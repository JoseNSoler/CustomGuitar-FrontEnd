import React from 'react'
import NavBarFilter from '../components/NavBarFilter'
import '../scss/Products.scss'
import '../scss/SingleProduct.scss'

//return <NavBarFilter />;
export default function Products() {
  return (
    <div className='mainProducts'>
        <h3>Products</h3>
        <NavBarFilter />
    </div>
  )
}
