import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Ragister = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlerSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:3001/sellerLogin",
        values
      );

      if (result.data.loginStatus) {
        navigate("/sellerDashboard");
      } else {
        // If seller login fails, try admin login
        try {
          const adminResult = await axios.post(
            "http://localhost:3001/adminLogin",
            values
          );

          if (adminResult.data.loginStatus) {
            navigate("/dashboard");
          } else {
            // If admin login fails, try user login
            try {
              const userResult = await axios.post(
                "http://localhost:3001/userLogin",
                values
              );

              if (userResult.data.loginStatus) {
                navigate("/homeuser");
              } else {
                setError(userResult.data.Error);
              }
            } catch (userError) {
              console.log(userError);
              setError("An error occurred while processing your request.");
            }
          }
        } catch (adminError) {
          console.log(adminError);
          setError("An error occurred while processing your request.");
        }
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header text-center">Login</div>
          <div className="card-body ">
            <form onSubmit={handlerSubmit}>
              <div className="row justify-content-center m-1 bg-danger text-white">
                {error && error}
              </div>
              <p></p>
              <p></p>
             

              <div class="form-floating mb-4">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  name="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  required
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  name="password"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  required
                />
                <label for="floatingPassword">Password</label>
              </div>
              <p></p>
              <p></p>
              <button type="submit" className="btn btn-primary btn-block w-100">
                Login
              </button>
             

              <Link
                to="/user_ragiser"
                className="btn btn-primary btn-block w-100 mt-3"
              >
                Signup
              </Link>
              <p className="m-3">
                signup for seller
                <Link to="/signup" className="link-secondary">
                  Click here for Seller
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ragister;
