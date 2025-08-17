import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Profile from "./Profile";
import AddAccount from "./AddAccount";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import PostCardHome from "./PostCardHome";

const url = "http://localhost:5000/";
const getPostsUrl = "http://localhost:5000/users/getAllPosts";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(getPostsUrl);
        console.log("All Posts Are :" + JSON.stringify(res.data.posts));
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to get Posts:", error);
      }
    };
    getPosts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="gradient-background min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light shadow-sm px-4">
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          🏴‍☠️ Pirates
        </Link>

        {/* Toggler button (appears on mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {user && (
                <Link
                  className="nav-link fw-semibold"
                  to="/profile"
                  state={{ userid: user.id }}
                >
                  Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold"
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
              >
                Google
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold"
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center py-5">
        <h1 className="header">Welcome to Pirates</h1>
        <p className="fs-5 text-secondary">
          Where treasures are stories and posts are the loot!
        </p>
      </header>

      {/* Full-Width Posts Section */}
      <section className="px-3 py-2">
        <div className=" p-3 shadow-sm post-section ">
          <h3 className="text-primary fw-bold mb-4">Latest Posts</h3>
          {/* <div className="post-placeholder text-secondary text-center">
            <p className="fs-4">No posts yet... time to start the adventure!</p>
          </div> */}
          <div className="home-container">
            {posts.map((post)=>{
              return<PostCardHome
              profilePicUrl={post.profilepic_url}
              name={post.name}
              imageUrl={post.img_url}
              title={post.title}
              body={post.content}
            />
            })}
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
