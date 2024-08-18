import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
// import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import { Outlet } from 'react-router-dom'


const HomeUser = () => {
  return (
   <>
    
 <Navbar/>
<Outlet/>

 <Footer/>
   </>
  )
}

export default HomeUser
