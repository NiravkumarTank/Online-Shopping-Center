// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const EditCategoy = () => {

//   const { id } = useParams();
//   const [ category , setCategory] = useState({
//     name: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/edit_category/${id}`)
//       .then((result) => {
//         if (
//           result.data &&
//           result.data.Result
//         ) {
//           const fetchedcategory = result.data.Result[0];
//           setCategory({
//             name: fetchedcategory.name,
//           });
//         }
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send updated category data to the server
//     axios
//       .put(`http://localhost:3001/edit_categorys/${id}`, category)
//       .then((result) => {
//         if (result.data && result.data.Status) {
//           alert(result.data.Error);
//         } else {
//           alert(result.data.message);
//           navigate("/dashboard/category");
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
//               Edit Category
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Category Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={category.name}
//                     onChange={(e) =>
//                       setCategory({ ...category, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary mt-3 w-100">
//                   Edit Product
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCategoy;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/edit_category/${id}`)
      .then((response) => {
        const fetchedCategory = response.data.Result[0];
        setCategory({
          name: fetchedCategory.name,
        });
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/edit_categorys/${id}`, category)
      .then((response) => {
        if (response.data && response.data.Status) {
          alert(response.data.Error);
        } else {
          alert(response.data.message);
          navigate("/dashboard/category");
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
      });
  };

  return (
    <div>
      <div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                Edit Category
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={category.name}
                      onChange={(e) =>
                        setCategory({ ...category, name: e.target.value })
                      }
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3 w-100">
                    Edit Product
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

export default EditCategory;
