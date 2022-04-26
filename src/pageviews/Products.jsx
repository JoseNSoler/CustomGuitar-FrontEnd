import React from 'react'
import NavBarFilter from '../components/NavBarFilter'
import '../scss/Products.scss'
import '../scss/SingleProduct.scss'


export default function Products() {
  return (
    <div className='mainProducts'>
        <h3>Guitarras</h3>
        <NavBarFilter />
    </div>
  )
}
