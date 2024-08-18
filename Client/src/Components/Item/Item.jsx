import "./Item.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Item = () => {
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

  return (
    <>
      {products.map((product) => (
        <tr key={product.product_id}>
          <div className="card-container" style={{ width: "18rem;" }}>
            <section class="articles">
              <article>
                <div class="article-wrapper">
                  <figure>
                    <Link to={""} className="card-img-">
                      <img
                        src={`http://localhost:3001/Images/${product.image}`}
                        alt={product.product_name}
                        className="image_product1"
                      />
                    </Link>
                  </figure>
                  <div class="article-body">
                    <h4>Product Name :{product.product_name}</h4>
                    <p>
                      <p className="card-text">
                        Product Description : {product.product_description}
                      </p>
                      <h5 className="card-text">
                        Product Price :{product.product_price}
                      </h5>
                      <h5 className="card-text">
                        Product Quantity : {product.product_quantity}
                      </h5>
                    </p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </tr>
      ))}
    </>
  );
};

export default Item;
