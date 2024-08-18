import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import All from "./pages/All";
// import Home from "./pages/Home";
// import Admin from "./pages/Admin";
import Ragister from "./pages/Ragister";

import Home1 from "./pages/Home1";
import Seller from "./pages/Seller";
import Category from "./pages/Category";
import EditCategoy from "./pages/EditCategory";
import Profile from "./pages/Profile";
import AddCategory from "./pages/AddCategory";
import "bootstrap";
import AddSeller from "./pages/AddSeller";
import Dashboard from "./pages/Dashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ManageProduct from "./pages/ManageProduct";
import UserRagister from "./pages/UserRagister";
import HomeUser from "./pages/HomeUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import HomeAdmin from "./pages/HomeAdmin";
import EditSeller from "./pages/EditSeller";


// import Navbar from './Components/Navbar/Navbar';
import Shop from './pages/Shop';
// import ShopCategory from './pages/ShopCategory';
// import Product from './pages/Product';
import Cart from './pages/Cart';
// import LoginSignup from './pages/LoginSignup';
// import Footer from './Components/Footer/Footer';
// import men_banner from './Components/Assets/banner_mens.png'
// import women_banner from './Components/Assets/banner_women.png'
// import kid_banner from './Components/Assets/banner_kids.png'


import 'bootstrap/dist/css/bootstrap.min.css';
import About from "./pages/About";
import Other1 from "./Components/other/Other1";
import Cloths1 from "./Components/Cloths/Cloths1";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";


function App() {
  return (
    // <div className='App'>
    // <ToastContainer position="top-center" />
    //   <div>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Ragister />}></Route>
       {/*seller for signup page */}
        <Route path="/signup" element={<Signup />}></Route>
        {/* user signup page  */}
        <Route path="/user_ragiser" element={<UserRagister/>}></Route>

         {/*admin for dashboard page */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<HomeAdmin />}></Route>
          <Route path="/dashboard/seller" element={<Seller />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/add_category" element={<AddCategory />}></Route>
          <Route path="/dashboard/edit_category/:id" element={<EditCategoy />}></Route>
          <Route path="/dashboard/add_seller" element={<AddSeller />}></Route>
          <Route path="/dashboard/edit_seller/:id" element={<EditSeller />}></Route>
        </Route>

        {/*seller for dashboard page */}
        <Route path="/sellerDashboard" element={<SellerDashboard />}>
          <Route path="" element={<Home1 />}></Route>
          <Route path="/sellerDashboard/manage_product" element={<ManageProduct />}></Route>
          <Route path="/sellerDashboard/add_product" element={<AddProduct />} ></Route>
          <Route path="/sellerDashboard/edit_product/:product_id" element={<EditProduct />} ></Route>
        </Route>

        {/*user for signup page */}

        <Route path="/homeuser" element={<HomeUser/>} >
        <Route path='' element={<Shop/>}/>
        {/* <Route path='/homeuser/mens' element={<ShopCategory/> }/>
        <Route path='/homeuser/womens' element={<ShopCategory/> }/>
        <Route path='/homeuser/kids' element={<ShopCategory></ShopCategory>}/> */}
        {/* <Route path="/homeuser/product" element={<Product/>}> */}
          {/* <Route path='/homeuser/:productId' element={<Product/>}/> */}
        {/* </Route> */}
        <Route path='/homeuser/cart' element={<Cart/>}/>
        {/* <Route path='/login' element={<LoginSignup/>}/> */}
        {/* <Route path="/homeuser/login" element={<UserRagister/>}></Route> */}

        <Route path="/homeuser/about" element={<About/>}></Route>
        <Route path="/homeuser/category/cloth" element={<Cloths1/>}></Route>
          <Route path="/homeuser/category/cloth/:product_id" element={<ProductDisplay/>}></Route>
        <Route path="/homeuser/category/other" element={<Other1/>}></Route>
        <Route path="/homeuser/profile" element={<Profile/>}></Route>

            
        </Route>

      </Routes>

   
      {/* <Routes>

        <Route path='/user' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        {/* <Route path='/login' element={<LoginSignup/>}/> 
        <Route path="/login" element={<UserRagister/>}></Route>
      </Routes> */}
    
    </BrowserRouter>

    //   </div>

    // </div>
  );
}

export default App;
