import React from 'react'
import './Item1.css'
// import { Link } from 'react-router-dom'

const Item1 = (props) => {
  return (
  
    <tr key={props.id}>
    <div className="card-container" style={{ width: "18rem;" }}>
      <section class="articles">
        <article>
          <div class="article-wrapper">
     <div to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></div>
            
            <div class="article-body">
              <h4>${props.new_price}</h4>
              <p>
                <p className="card-text">
                ${props.old_price}
                </p>
             
              </p>
            </div>
          </div>
        </article>
      </section>
    </div>
  </tr>
  )
}

export default Item1
