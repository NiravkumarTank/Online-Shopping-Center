import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom'



function AddSeller() {
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    password:"",
    contact: "",
    address: "",
    category_id: "",
  });

  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fectAllData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/category");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fectAllData();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/add_seller", seller)
  //     .then((result) => console.log(result.data))
  //     .catch((err) => console.log(err));
  // };
  const navigation = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001/add_seller", seller)
  //     .then((result) => {
  //       if (result.data.Status) {
  //         navigation("/dashboard/seller");
  //       } else {
  //         console.log(result.data);
  //         // alert(result.data.Error);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/add_seller", seller)
      .then((result) => {
        if (result.data.Status) {
          navigation("/");
        }
        else{
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
          <div className="card-header d-flex justify-content-center">
            <strong> <h5> Sign-up for Seller</h5></strong>
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
                    onChange={(e) =>
                      setSeller({ ...seller, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) =>
                      setSeller({ ...seller, password: e.target.value })
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
                 Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSeller;
