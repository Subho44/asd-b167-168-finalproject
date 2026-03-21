import React from 'react'

const Productcard = ({product,addToCart}) => {

  return <>
  <div className='col-md-4 mb-4'>
  <div className='card h-100'>
    <img 
    src={product.image}
    className='card-img-top'
    alt='img'
    style={{height:"250px", objectFit:"cover"}}
    />
    <div className='card-body'>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <h6>₹{product.price}</h6>
      <button className='btn btn-dark' onClick={()=>addToCart(product)}>
       Add To Cart
      </button>
    </div>

  </div>


  </div>
  
  
  </>
}

export default Productcard