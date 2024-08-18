import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();

  const navigation = useNavigate();

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          alert(result.data.message);
          navigation("/dashboard/category");
        } else {
          console.log(result.data);

          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {/* <div>
        <h1>Add Category</h1>
        <form onSubmit={handlerSubmit}>
          <div>
            <label htmlFor="category">
              <strong>Category</strong>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div> */}
      <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Add Category</div>
          <div className="card-body">
            <form  onSubmit={handlerSubmit}>
              <div className="form-group">
                <label htmlFor="category"><strong>Category</strong></label>
               
                <input
              type="text"
              name="category"
              placeholder="Enter category"
              onChange={(e) => setCategory(e.target.value)}
            />
              </div>
              <p></p><p></p>
              <button type="submit" className="btn btn-primary btn-block">
               Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
    </>
  );
};

export default AddCategory;
