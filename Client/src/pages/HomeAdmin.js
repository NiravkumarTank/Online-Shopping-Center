import React ,{ useEffect, useState } from 'react'
import axios from "axios";

const HomeAdmin = () => {
    const [sellerTotal, setSellerTotal] = useState();
    const [userTotal, setUserTotal] = useState();
    const [productTotal, setProductTotal] = useState();
  
    useEffect(() => {
      userCount();
      productCount();
      sellerCount();
    }, []);
  
    const userCount = () => {
      axios.get("http://localhost:3001/user_count").then((result) => {
        if (result.data && result.data.Status) {
          setUserTotal(result.data.Result[0].userData);
        } else {
          console.log(result.data.Error);
        }
      });
    };
  
    const productCount = () => {
      axios.get("http://localhost:3001/product_count").then((result) => {
        if (result.data && result.data.Status) {
          setProductTotal(result.data.Result[0].productcount);
        } else {
          console.log(result.data.Error);
        }
      });
    };
  
 

  const sellerCount = () => {
    axios.get("http://localhost:3001/seller_count").then((result) => {
      if (result.data && result.data.Status) {
        setSellerTotal(result.data.Result[0].sellerData);
      } else {
        console.log(result.data.Error);
      }
    });
  };


  return (
    <div>
        <div className="container">
    <div className="row">
      <div className="col-lg-10 mb-3 mt-3">
        <div className="card text-bg-light w-100">
          <h4 className="card-header text-center">
            <strong>Seller Register</strong>
          </h4>
          <div className="card-body d-flex justify-content-center">
            <h5 className="card-title text-center">Total :</h5>
            <h5 className="card-title text-center">{sellerTotal}</h5>
          </div>
        </div>
      </div>
      </div></div>
      <div className="container">
    <div className="row">
      <div className="col-lg-5 mb-3">
        <div className="card text-bg-light w-100">
          <h4 className="card-header text-center">
            <strong>User Register</strong>
          </h4>
          <div className="card-body d-flex justify-content-around">
            <h5 className="card-title text-center">Total :</h5>
            <h5 className="card-title text-center">{userTotal}</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-5 mb-3">
        <div className="card text-bg-light w-100">
          <h4 className="card-header text-center">
            <strong>Total Product </strong>
          </h4>
          <div className="card-body d-flex justify-content-around">
            <h5 className="card-title text-center">Total :</h5>
            <h5 className="card-title text-center">{productTotal}</h5>
          </div>
        </div>
      </div>
      
     {/* <h1>hellohvjhv</h1> */}
    </div>
    
  </div>
    </div>
  )
}

export default HomeAdmin
