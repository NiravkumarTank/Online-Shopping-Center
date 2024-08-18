import React, { useEffect, useState } from "react";

const Profile = () => {
  // State to store user details
  const [user, setUser] = useState(null);

  // Fetch user details from session storage on component mount
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  // If user is not logged in, render a message
  if (!user) {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="alert alert-danger" role="alert">
              Please log in to view your profile.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, render the profile details
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h5>User Profile</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Name:</strong> {user.name}
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> {user.email}
                </li>
                <li className="list-group-item">
                  <strong>Contact:</strong> {user.contact}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {user.address}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
