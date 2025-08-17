import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;
function Signin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate();

  async function handle_request(e) {
    e.preventDefault();
    const body = {
      user_name: username,
      pass_word: password,
    };
    const res = await axios.post(url + "/signup", body,{ withCredentials: true });
    console.log(res);
    if(res.data=="successful")
    {
         navigate("/home");
    }
    else if(res.data="duplicate user")
    {
         navigate('/login');
    }
  }

  return (
    <div className="container">
      <main className="form-signin w-100 m-auto mt-5 pt-5 d-flex align-items-center justify-content-center">
        <form>
          <img
            className="mb-4  img_form"
            src="/assets/pirates.jpg"
            alt=""
            width="120"
            height="120"
            id="img_form"
          />
          <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control mt-2"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
         
          <button
            className="btn btn-dark w-100 py-2 mt-3"
            type="button"
            onClick={handle_request}
          >
            Sign in
          </button>
          <button
            className="btn btn-primary w-100 py-2 mt-3"
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:5000/auth/google";
            }}
          >
            Sign in with Google
          </button>

          <p className="mt-5 mb-3 text-body-secondary">© 2025</p>
        </form>
      </main>
    </div>
  );
}
export default Signin;
