import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          setUser(res.data.user);  // set user from response data
          console.log("User is", res.data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <h1>Hello {user ? user.username || user.id : "Guest"}</h1>
    </div>
  );
}

export default Home;
