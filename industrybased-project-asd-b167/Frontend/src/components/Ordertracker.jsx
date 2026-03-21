import React from 'react'

const Ordertracker = ({status}) => {

  return <>
    <div>
      <b>Status:</b>
      <span className='badge badge-warning'>{status}</span>
    </div>
  
  
  </>
}

export default Ordertracker