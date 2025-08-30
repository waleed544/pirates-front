import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;
const currentYear = new Date().getFullYear();
function Signin() {
  const [Username, setusername] = useState("");
  const [Password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  async function handle_request(e) {
    e.preventDefault();
    const body = {
      username: Username,
      password: Password,
    };
    try {
      const res = await axios.post(url + "/login", body, {
        withCredentials: true,
      });
      console.log("Data is", res.data);
      if (res.status === 200) {
        navigate("/home", { state: { userid: res.data.user.id } });
        console.log("navigating home with id is" + res.data.user.id);
      } // Redirect here after login success
      else {
        console.log("errrrrr"+res.data);
        seterror(res?.data?.message ?? "Something went wrong");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      seterror(err?.response?.data?.message ?? "Something went wrong");
    }
  }

  return (
    <div className="container">
      <main className="form-signin w-100 m-auto mt-5 pt-5 d-flex align-items-center justify-content-center">
        <form onSubmit={handle_request}>
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
              value={Username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              required
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
              value={Password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-dark w-100 py-2 mt-3" type="submit">
            Login
          </button>
          <p className="mt-5 mb-3  error">{error}</p>
          <p className="mt-5 mb-3 text-body-secondary error">© {currentYear}</p>
        </form>
      </main>
    </div>
  );
}
export default Signin;
