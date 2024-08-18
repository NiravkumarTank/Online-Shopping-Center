import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import remove_icon from "../Assets/cart_cross_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = () => {
  const { product_id } = useParams();
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  });

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
            image: fetchedProduct.image,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [product_id]);

  const incrementCount = () => {
    setCounter(counter + 1);
  };

  const decrementCount = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  // const handleClick = (name, price) => {
  //   const total = counter * price; // Calculate total price
  //   alert(
  //     "Title: " +
  //     name +
  //     "\nPrice: " +
  //     price +
  //     "\nQuantity: " +
  //     counter +
  //     "\nTotal Price: " +
  //     total + // Display total price
  //     "\nThis Product is going to be packed"
  //   );
  //   navigation("/homeuser");
  // };



  // const handleClick = (name, price) => {
  //   const total = counter * price; // Calculate total price
    
  //   const message = `Title: ${name}\nPrice: ${price}\nQuantity: ${counter}\nTotal Price: ${total}\nThis Product is going to be packed`;

  //   alert(message);

   
  //   const emailData = {
  //     to: "nvtank11@gmail.com", // Replace with the actual recipient's email address
  //     subject: 'Cart Information',
  //     message: message
  //   };

  //   axios.post('http://localhost:3001/send-email', emailData)
  //     .then(response => {
  //       console.log('Email sent successfully:', response.data);
  //       navigation("/homeuser"); // Navigate after email is sent
  //     })
  //     .catch(error => {
  //       console.error('Error sending email:', error);
  //       // Handle error
  //     });
  // };




  const handleClick = () => {
    const total = counter * product.price; // Calculate total price
    const message1 = `Title: ${product.name}\nPrice: ${product.price}\nQuantity: ${counter}\nTotal Price: ${total}\nThis Product is Selling`;
    const message = `Title: ${product.name}\nPrice: ${product.price}\nQuantity: ${counter}\nTotal Price: ${total}\nThis Product is going to be packed`;

    alert(message); // Display alert with cart information

    // Send email with cart information
    axios
      .post("http://localhost:3001/send-email", {
        to: "nvtank11@gmail.com ", // Replace with the actual recipient's email address
        subject: "Cart Information",
        message: message1,
      })
      .then((response) => {
        console.log("Email sent successfully:", response.data);
        // Navigate after email is sent
        window.location.href = "/homeuser";
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        // Handle error
      });
  };
  
  
  

  const navigation = useNavigate();

  return (
    <div className="product-display">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>AddToCart</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
              id="imagetable"
                onClick={window.scrollTo(0, 0)}
                src={`http://localhost:3001/Images/${product.image}`}
                alt=""
                className="carticon-product-icon"
              />
            </td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <div className="btn" >
                <button
                  type="button"
                  id="quntbtn"
                  className="btn btn-warning "
                  onClick={decrementCount}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={counter}
                  id="slot"
                  readOnly
                />
                <button
                  type="button"
                  id="quntbtn"
                  className="btn btn-warning"
                  onClick={incrementCount}
                >
                  +
                </button>
              </div>
            </td>
            <td>{counter * product.price}</td>
            <td>
              <button
                className="btn btn-warning btn-block"
                onClick={() => handleClick(product.name, product.price)}
              >
                Cart
              </button>
            </td>
            <td>
              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => {
                  navigation("/homeuser/category/cloth");
                }}
                alt=""
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDisplay;
