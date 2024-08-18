import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditProduct = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`http://localhost:3001/edit_product/${product_id}`)
      .then((result) => {
        if (
          result.data &&
          result.data.Result &&
          result.data.Result.length > 0
        ) {
          const fetchedProduct = result.data.Result[0];
          setProduct({
            name: fetchedProduct.product_name,
            description: fetchedProduct.product_description,
            price: fetchedProduct.product_price,
            quantity: fetchedProduct.product_quantity,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [product_id]);


 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", product.name);
  //   formData.append("description", product.description);
  //   formData.append("price", product.price);
  //   formData.append("quantity", product.quantity);
    
  //   axios.put(`http://localhost:3001/edit_products/${product_id}`, formData)
  //     .then(result => {
  //       console.log(result.data);
  //       if(result.data.Status){
  //           navigate("/sellerDashboard/manage_product")
  //       }else{
  //           alert(result.data.Error);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated product data to the server
    axios
      .put(`http://localhost:3001/edit_products/${product_id}`, product)
      .then((result) => {
        if (result.data && result.data.Status) {
          alert(result.data.Error);
        } else {
          alert(result.data.message);
          navigate("/sellerDashboard/manage_product");
        }
      })
      .catch((err) => console.log(err));
  };

// const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("quantity", product.quantity);
//     // formData.append("image", product.image); 
    
//     axios.put(`http://localhost:3001/edit_products/${product_id}`, formData)
//       .then(result => {
//         console.log();
//         if(result.data.Status){
//             navigate("/sellerDashboard/manage_product")
//         }else{
//             alert(result.data.Error);
//         }
//       })
//       .catch(err => console.log(err));
//   };
  
  return (
    // <div>
    //   <div>
    //     <div className="row justify-content-center mt-5">
    //       <div className="col-md-6">
    //         <div className="card">
    //           <div className="card-header d-flex justify-content-center">
    //             Edit Product
    //           </div>
    //           <div className="card-body">
    //             <form onSubmit={handleSubmit}>
    //               <div className="form-group">
    //                 <label>Product Name</label>
    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   id="name"
    //                   name="name"
    //                   placeholder="Enter Product Name"
    //                   value={product.name}
    //                   onChange={(e) =>
    //                     setProduct({ ...product, name: e.target.value })
    //                   }
    //                 />
    //               </div>

    //               <div className="form-group">
    //                 <label>Description</label>

    //                 <input
    //                   type="text"
    //                   className="form-control"
    //                   id="description"
    //                   name="description"
    //                   placeholder="Enter Description"
    //                   autoComplete="off"
    //                   value={product.description}
    //                   onChange={(e) =>
    //                     setProduct({ ...product, description: e.target.value })
    //                   }
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <label>Price</label>
    //                 <input
    //                   type="number"
    //                   className="form-control"
    //                   id="price"
    //                   name="price"
    //                   placeholder="Enter price"
    //                   value={product.price}
    //                   onChange={(e) =>
    //                     setProduct({ ...product, price: e.target.value })
    //                   }
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <label>Quantity</label>

    //                 <input
    //                   type="number"
    //                   className="form-control"
    //                   id="quantity"
    //                   name="quantity"
    //                   placeholder="Enter quantity"
    //                   value={product.quantity}
    //                   onChange={(e) =>
    //                     setProduct({ ...product, quantity: e.target.value })
    //                   }
    //                 />
    //               </div>

    //               {/* <div className="form-group">
    //                 <label>Image </label>

    //                 <input
    //                   type="file"
    //                   className="form-control"
    //                   id="image"
    //                   name="image"
    //                   value={product.filename}
    //                   onChange={(e) =>
    //                     setProduct({ ...product, image: e.target.files[0] })
    //                   }
    //                 />
    //               </div> */}

    //               <p></p>
    //               <p></p>
    //               <button
    //                 type="submit"
    //                 className="btn btn-primary btn-block w-100"
    //               >
    //                 Edit Product
    //               </button>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-center">
              Edit Product
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">
                  Edit Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EditProduct;

