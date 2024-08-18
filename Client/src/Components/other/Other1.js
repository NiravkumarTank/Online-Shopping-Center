import React from 'react'
import "./Other1.css"
// import new_collection from '../Assets/new_collections'

import all_product1 from '../Assets/all_product1'
import Item1 from '../Item1/Item1'

const Other1 = () => {
  return (
    // <div className='new-collections '>
    //   <h1>NEW COLLECTIONS</h1>
    //   <hr />
    //   <div className="collections  ">
    //     {all_product1.map((item1,i)=>{
    //         return <Item1 key={i} id={item1.id} name={item1.name} image={item1.image} new_price={item1.new_price} old_price={item1.old_price}/>
    //     })}
    //   </div>
    // </div>
    <div className='popular'>
      <h3 className='mt-2'>All PRODUCTS</h3>
     
      <div className="popular-item">
        {all_product1.map((item,i)=>{
            return <Item1 key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Other1
