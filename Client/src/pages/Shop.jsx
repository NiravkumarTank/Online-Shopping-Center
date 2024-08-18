import React from 'react'
import Hero from '../Components/Hero/Hero'
// import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
// import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import Cloths1 from '../Components/Cloths/Cloths1'

const Shop = () => {
  return (
    <div>
      <Hero/>
      {/* <Popular/> */}
      <Cloths1/>
      <Offers/>
      {/* <NewCollections/> */}
      <NewsLetter/>
    </div>
  )
}

export default Shop
