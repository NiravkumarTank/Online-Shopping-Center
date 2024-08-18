import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManageProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/get_product");
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          // Handle non-array response here
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData();
  }, []);

  const handleDelete = (product_id) => {
    axios
      .delete("http://localhost:3001/delete_product" + product_id)
      .then((result) => {
        if (result.data && result.data.Status) {
          // navigate("/sellerDashboard/manage_product")
          alert(result.data.Error);
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <div>
      <h1>Manage Product</h1>
      <Link to="/sellerDashboard/add_product" className="btn btn-success ms-3">
        Add Product
      </Link>

      <div className=" mt-3">
        <table className="table table-responsive table-sm table-hover w-75 p-5 ">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="align-middle ">
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>
                  <img
                    src={`http://localhost:3001/Images/${product.image}`}
                    alt={product.product_name}
                    className="image_product"
                  />
                </td>
                <td>{product.product_description}</td>
                <td>{product.product_price}</td>
                <td>{product.product_quantity}</td>
                <td>
                  <Link
                    to={`/sellerDashboard/edit_product/` + product.product_id}
                    className="btn btn-info btn-sm  me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProduct;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function ManageProduct() {
//   const [products, setProducts] = useState([]);

//   // useEffect(() => {
//   //   const fetchAllData = async () => {
//   //     try {
//   //       const res = await axios.get("http://localhost:3001/get_product");
//   //       setProducts(res.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };
//   //   fetchAllData();
//   // }, []);

//   useEffect(()=>{
//     const fectAllData = async ()=>{
//       try {
//         const res =await axios.get("http://localhost:3001/get_product")
//         setProducts(res.data)
//         console.log(res)
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     fectAllData()
//   },[])

//   return (
//     <div>
//       <h1>Manage Product</h1>
//       <Link to="/sellerDashboard/add_product" className="btn btn-success">
//         Add Product
//       </Link>

//       <div className="table-responsive mt-2">
//       <div>
//             {products.map(product=>(
//               <div className='product'>

//                { product.image && <img src={`http://localhost:3001/Images/${product.image}`} className='image_product' alt="" />}
//                <h1 className='name'>{product.product_name}</h1>
//                {product.price}
//               </div>
//             ))}
//           </div>
//         <table className="table table-sm">
//           <thead className="thead-dark">
//             <tr>
//               <th>Name</th>
//               <th>Image</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//               {/* <tbody>
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td >{product.name}</td>
//                 <td>
//                   <img src={`http://localhost:3001/Images/${product.image}`} alt={product.name} className="image_product" />
//                 </td>
//                 <td>{product.description}</td>
//                 <td>{product.price}</td>
//                 <td>{product.quantity}</td>
//                 <td>
//                   <button>Edit</button>
//                   <button>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody> */}
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ManageProduct;
