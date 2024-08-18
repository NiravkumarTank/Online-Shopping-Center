import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./deshboard.css";

const SellerDashboard = () => {
  return (
    <>
      <div>
        <header>
          <h1 >Online Shopping Center Seller side</h1>
        </header>
        <div class="container">
          <nav>
            <ul>
              <li>
                <Link to="/sellerDashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/sellerDashboard/manage_product">Manage Product</Link>
              </li>
              {/* <li>
                <Link to="/sellerDashboard">Profile</Link>
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

export default SellerDashboard;
