import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Seller() {
const style1 = {
  fontSize :"215%",
}
  
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/get_seller");
        if (Array.isArray(res.data)) {
          setSellers(res.data);
        } else {
          setSellers([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllData();
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/delete_seller" + id).then((result) => {
      if (result.data && result.data.Status) {
        alert(result.data.Error);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <ul></ul><p className="mt-3 " style={style1}>List of All Seller</p>
        <Link to="/dashboard/add_seller" className="btn btn-success text-center mt-4 mb-3 me-5  ">
          Add Seller
        </Link>
      </div>
      <hr />

      <div className=" mt-3">
        <table className="table table-responsive table-sm table-hover w-75 p-5 ">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Category_id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="align-middle ">
            {sellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.name}</td>

                <td>{seller.email}</td>
                <td>{seller.contact}</td>
                <td>{seller.address}</td>
                <td>{seller.category_id}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_seller/` + seller.id}
                    className="btn btn-info btn-sm  me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(seller.id)}
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

export default Seller;
