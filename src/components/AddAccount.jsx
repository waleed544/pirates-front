import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const addInfoUrl = `${process.env.REACT_APP_API_URL}/users/addInfo`;


function AddAccount() {
   const navigate = useNavigate();
   const location = useLocation();

  
  const { userid } = location.state || {}; // safely get userid
  console.log("UserID:", userid);




  const [profileImg, setProfileImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [previewProfile, setPreviewProfile] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  useEffect(() => {
       if(!userid){
         navigate("/SignUp");
         return;
      }
    },[]);

  async function handleCreateAccount(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("coverImg", coverImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("age", age);
    formData.append("userId", userid);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const result = await axios.post(addInfoUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Result After Adding Info is"+JSON.stringify(result.data));
    if(result.data=="Info Added Succesfully")
    {
      console.log("Navigate to profile");
      navigate("/profile",{ state: { userid: userid } });
    }
  }


  
  return (
    <div className="gradient-background min-vh-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="header mb-4">Create an Account to Pirates</h1>
      <form onSubmit={handleCreateAccount}>
        <div className="card-box p-4 rounded shadow">
          {/* Profile Image */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Profile Image</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfileImg(file);
                  setPreviewProfile(URL.createObjectURL(file));
                }
              }}
            />
            {previewProfile && (
              <div className="mt-3">
                <img
                  src={previewProfile}
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "2%",
                    border: "1px solid #007BFF",
                  }}
                />
              </div>
            )}
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Cover Image</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setCoverImg(file);
                  setPreviewCover(URL.createObjectURL(file));
                }
              }}
            />
            {previewCover && (
              <div className="mt-3">
                <img
                  src={previewCover}
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "2%",
                    border: "1px solid #007BFF",
                  }}
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="form-label fw-bold fs-5">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your age"
              required
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>

          <button className="btn btn-primary w-100 py-2 fw-bold" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
