// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { Link } from 'react-router-dom'
// // import moment from 'moment'

// function UserRagister() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     contact: "",
//     address: "",
//     // date: "",
//     gender: "",
//   });

//   const handleGenderChange = (e) => {
//     setUser({ ...user, gender: e.target.value });
//   };

//   //   const handleDateChange = (e) => {
//   //     const formattedDate = moment(e.target.value).format('YYYY-MM-DD');
//   //     setUser({ ...user, date: formattedDate });
//   //   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios
//   //     .post("http://localhost:3001/add_seller", user)
//   //     .then((result) => console.log(result.data))
//   //     .catch((err) => console.log(err));
//   // };
//   const navigation = useNavigate();

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios
//   //     .post("http://localhost:3001/add_seller", user)
//   //     .then((result) => {
//   //       if (result.data.Status) {
//   //         navigation("/dashboard/user");
//   //       } else {
//   //         console.log(result.data);
//   //         // alert(result.data.Error);
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   axios
//   //     .post("http://localhost:3001/add_user", user)
//   //     .then((result) => {
//   //       if (result.data.Status) {
//   //         alert(result.data.message);
//   //         sessionStorage.setItem("user", JSON.stringify(user));
//   //         navigation("/");
//   //       } else {
//   //         alert(result.data.Error);
//   //       }
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:3001/add_user", user)
//       .then((result) => {
//         if (result.data.Status) {
//           alert(result.data.message);
//           // Save user info in session storage
//           sessionStorage.setItem("user", JSON.stringify(user));
//           navigation("/");
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div>
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header d-flex justify-content-center">
//               <strong>
//                 <h5> Sign-up for User</h5>
//               </strong>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                     placeholder="Enter Name"
//                     onChange={(e) => setUser({ ...user, name: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Email</label>

//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     placeholder="Enter Email"
//                     autoComplete="off"
//                     onChange={(e) =>
//                       setUser({ ...user, email: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     placeholder="Enter password"
//                     onChange={(e) =>
//                       setUser({ ...user, password: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Contact</label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     id="Contact"
//                     name="Contact"
//                     placeholder="Enter Contact Number"
//                     onChange={(e) =>
//                       setUser({ ...user, contact: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Address</label>

//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     name="address"
//                     placeholder="Enter Address"
//                     onChange={(e) =>
//                       setUser({ ...user, address: e.target.value })
//                     }
//                     required
//                   />
//                 </div>
//                 {/* <div className="form-group"> */}
//                 {/* <label>DOB</label>
//   <input
//     type="date"
//     className="form-control"
//     id="date"
//     name="date"
//     onChange={handleDateChange}
//   />
// </div> */}

//                 <div className="form-group">
//                   <label>Gender</label>
//                   <input
//                     type="radio"
//                     id="male"
//                     name="gender"
//                     value="male"
//                     checked={user.gender === "male"}
//                     onChange={handleGenderChange}
//                   />
//                   <label htmlFor="male" className="m-1">
//                     Male
//                   </label>

//                   <input
//                     type="radio"
//                     id="female"
//                     name="gender"
//                     value="female"
//                     checked={user.gender === "female"}
//                     onChange={handleGenderChange}
//                   />
//                   <label htmlFor="female">Female</label>
//                 </div>

//                 <p></p>
//                 <p></p>
//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-block w-100"
//                 >
//                   Signup
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserRagister;
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    address: "",
    gender: "",
  });

  const handleGenderChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/add_user", user)
      .then((result) => {
        if (result.data.Status) {
          alert(result.data.message);
          sessionStorage.setItem("user", JSON.stringify(user));
          navigation("/");
        } else {
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
              <strong>
                <h5> Sign-up for User</h5>
              </strong>
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
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
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
                      setUser({ ...user, email: e.target.value })
                    }
                    required
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
                      setUser({ ...user, password: e.target.value })
                    }
                    required
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
                      setUser({ ...user, contact: e.target.value })
                    }
                    required
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
                      setUser({ ...user, address: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={user.gender === "male"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="male" className="m-1">
                    Male
                  </label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={user.gender === "female"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>

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

export default UserRegister;
