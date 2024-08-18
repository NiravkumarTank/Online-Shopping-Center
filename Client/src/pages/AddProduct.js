import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  });

  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("image", product.image);
    axios
      .post("http://localhost:3001/add_product", formData)
      .then((result) => {
        if (result.data && result.data.Status) {
          alert(result.data.message);
          navigation("/sellerDashboard/manage_product");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Add Product
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Product Name"
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
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      autoComplete="off"
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
                      id="price"
                      name="price"
                      placeholder="Enter price"
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
                      id="quantity"
                      name="quantity"
                      placeholder="Enter quantity"
                      onChange={(e) =>
                        setProduct({ ...product, quantity: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Image </label>

                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={(e) =>
                        setProduct({ ...product, image: e.target.files[0] })
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-100 mt-3"
                  >
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

// import React, { useState } from 'react';

// const AddProduct = () => {
//   const [productName, setProductName] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [productPrice, setProductPrice] = useState(0);
//   const [productDiscount, setProductDiscount] = useState(0);
//   const [productQuantity, setProductQuantity] = useState(0);
//   const [productPhoto, setProductPhoto] = useState(null);
//   const [actualPrice, setActualPrice] = useState(0);

//   // Function to calculate actual price
//   const calculateActualPrice = () => {
//     const discountedPrice = productPrice - (productPrice * productDiscount) / 100;
//     const totalPrice = discountedPrice * productQuantity;
//     setActualPrice(totalPrice);
//   };

//   // Function to handle file input change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProductPhoto(file);
//   };

//   return (
//     <div>
//       <h2>Product Information</h2>
//       <label>
//         Product Name:
//         <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Product Description:
//         <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
//       </label>
//       <br />
//       <label>
//         Product Price:
//         <input type="number" value={productPrice} onChange={(e) => setProductPrice(parseFloat(e.target.value))} />
//       </label>
//       <br />
//       <label>
//         Product Discount (%):
//         <input type="number" value={productDiscount} onChange={(e) => setProductDiscount(parseFloat(e.target.value))} />
//       </label>
//       <br />
//       <label>
//         Product Quantity:
//         <input type="number" value={productQuantity} onChange={(e) => setProductQuantity(parseFloat(e.target.value))} />
//       </label>
//       <br />
//       <label>
//         Product Photo:
//         <input type="file" onChange={handleFileChange} />
//       </label>
//       <br />
//       <button onClick={calculateActualPrice}>Calculate Actual Price</button>
//       <br />
//       <h3>Actual Price: ${actualPrice}</h3>
//       {/* You can display other product information here */}
//     </div>
//   );
// };

// export default AddProduct;
