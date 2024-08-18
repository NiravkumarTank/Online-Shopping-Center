import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Category() {

  const style1 = {
    fontSize :"215%",
  }
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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete_category/${id}`) // Add a forward slash before id
      .then((result) => {
        if (result.data && result.data.Status) {
          alert(result.data.Error);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };
  

  return (
    <>
      <div>
       
        <div className="d-flex justify-content-between">
        <ul></ul><p className="mt-3 " style={style1}>List of All Category</p>
        <Link to="/dashboard/add_category" className="btn btn-success text-center mt-4 mb-3 me-5  ">
          Add Category
        </Link>
      </div>
      <hr />
      </div>
      <div className="table-responsive">
        <table className="table table-responsive table-sm table-hover w-50 p-5">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr>
                <td>{c.name}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_category/` + c.id}
                    className="btn btn-info btn-sm  me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Category;
