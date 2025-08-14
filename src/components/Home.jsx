import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Profile from "./Profile";
import AddAccount from "./AddAccount";
import { Link } from "react-router-dom";

const url = "http://localhost:5000/";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Use state for user

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(url + "auth/check", {
          withCredentials: true,
        });
        if (!res.data.authenticated) {
          console.log("Navigate to Sign Up");
          navigate("/SignUp");
        } else {
          setUser(res.data.user); // set user from response data
          console.log("User is", res.data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    checkAuth();
  }, [navigate]);

   return (
      <div className="gradient-light min-vh-100">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
          <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
            🏴‍☠️ Pirates
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">Home</Link>
              </li>
              <li className="nav-item">
               {user &&  <Link 
               className="nav-link fw-semibold" 
               to="/profile"
               state={{ userid: user.id }}
               >Profile</Link>}
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="https://google.com" target="_blank" rel="noreferrer">Google</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              </li>
            </ul>
          </div>
        </nav>
  
        {/* Header */}
        <header className="text-center py-5">
          <h1 className="header">Welcome to Pirates</h1>
          <p className="fs-5 text-secondary">Where treasures are stories and posts are the loot!</p>
        </header>
  
        {/* Full-Width Posts Section */}
        <section className="posts-full px-5 py-4">
          <div className="card p-5 shadow-sm post-section w-100">
            <h3 className="text-primary fw-bold mb-4">Latest Posts</h3>
            <div className="post-placeholder text-secondary text-center">
              <p className="fs-4">No posts yet... time to start the adventure!</p>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Home;
