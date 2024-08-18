import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSeller = () => {
  const { id } = useParams();

  const [category, setCategory] = useState([]);

  const [seller, setSeller] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    category_id: "",
  });

  const navigate = useNavigate();

  const fectAllData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/category");
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fectAllData();

    axios
      .get(`http://localhost:3001/edit_seller/${id}`)
      .then((result) => {
        if (
          result.data &&
          result.data.Result &&
          result.data.Result.length > 0
        ) {
          const fetchedProduct = result.data.Result[0];
          setSeller({
            name: fetchedProduct.name,
            email: fetchedProduct.email,
            contact: fetchedProduct.contact,
            address: fetchedProduct.address,
            category_id: fetchedProduct.category_id,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/edit_seller/${id}`, seller)
      .then((result) => {
        if (result.data && result.data.Status) {
          alert(result.data.message);

          navigate("/dashboard/seller");
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
                Edit Seller
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={seller.name}
                      onChange={(e) =>
                        setSeller({ ...seller, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      autoComplete="off"
                      value={seller.email}
                      onChange={(e) =>
                        setSeller({ ...seller, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact</label>

                    <input
                      type="text"
                      className="form-control"
                      id="Contact"
                      name="Contact"
                      placeholder="Enter Contact Number"
                      value={seller.contact}
                      onChange={(e) =>
                        setSeller({ ...seller, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>

                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      value={seller.address}
                      onChange={(e) =>
                        setSeller({ ...seller, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="category">Category</label>
                    <select
                      name="category"
                      id="category"
                      className="form-select"
                      value={seller.category_id}
                      onChange={(e) =>
                        setSeller({ ...seller, category_id: e.target.value })
                      }
                    >
                      {category.map((c) => {
                        return <option value={c.id}> {c.name}</option>;
                      })}
                    </select>
                  </div>
                  <p></p>
                  <p></p>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block w-100"
                  >
                    Update Seller
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

export default EditSeller;
