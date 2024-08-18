import { Link, Outlet } from "react-router-dom";
import "./deshboard.css";

const Deshboard = () => {
  return (
    <>
      <div>
        <header>
          <h1>Online Shopping Center</h1>
        </header>
        <div class="container">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/seller">Manage Seller</Link>
              </li>
              <li>
                <Link to="/dashboard/category">Add Category</Link>
              </li>
              {/* <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li> */}
              <li>
                <Link to="/">Log Out</Link>
              </li>
            </ul>
          </nav>
        </div>
        <section>
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Deshboard;
