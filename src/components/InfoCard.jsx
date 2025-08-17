import React, { useState } from "react";
import axios from "axios";

const editUserInfoUrl = "http://localhost:5000/users/updateUserInfo";

function InfoCard({ phone, email, age,userId,handlechange }) {
  const [isEdited, setIsEdited] = useState(false);
  const [editedPhone,setEditedPhone]=useState(phone);
  const [editedEmail,setEditedEmail]=useState(email);
  const [editedAge,setEditedAge]=useState(age);

  function handeltoggle() {
    isEdited ? setIsEdited(false) : setIsEdited(true);
    setEditedAge(age);
    setEditedEmail(email);
    setEditedPhone(phone);
  }

  async function handleEditInfo(e) {
    e.preventDefault(); 
    const formdata= new FormData();
    formdata.append("phone",editedPhone);
    formdata.append("email",editedEmail);
    formdata.append("age",editedAge);
    const result=await axios.post(editUserInfoUrl+`/${userId}`,formdata);
    console.log("Result from Editing info is"+result.data);
     handlechange(editedPhone,editedEmail,editedAge);
     handeltoggle();
      return 1;
  }


  return (
    <div className="card infocard shadow-sm p-3">
      {!isEdited && (
        <div>
          <h5 className="card-title mb-3">Contact Info </h5>
          <ul className="list-unstyled mb-0">
            <li className="mb-2m-2 ">
              <strong>📞 Phone:</strong>
              <div>{phone}</div>
            </li>
            <li className="m-2">
              <strong>✉️ Email:</strong>
              <div>{email}</div>
            </li>
            <li className="m-2">
              <strong>⏳ Age:</strong>
              <div>{age}</div>
            </li>
          </ul>
          <button className="btn btn-dark" onClick={handeltoggle}>
            Edit
          </button>
        </div>
      )}

      {isEdited && (
        <form onSubmit={handleEditInfo}>
        <div>
          <h5 className="card-title mb-3">Contact Info </h5>
          <ul className="list-unstyled mb-0">
            <li className="mb-2m-2 ">
              <strong>📞 Phone:</strong>
              <input
                className="form-control mb-2"
                placeholder="Phone Number"
                required
                value={editedPhone}
                onChange={(e)=>{
                  setEditedPhone(e.target.value);
                }}
              />
            </li>
            <li className="m-2">
              <strong>✉️ Email:</strong>
              <input
                className="form-control mb-2"
                placeholder="Email"
                required
                value={editedEmail}
                onChange={(e)=>{
                  setEditedEmail(e.target.value);
                }}
              />
            </li>
            <li className="m-2">
              <strong>⏳ Age:</strong>
              <input
                className="form-control mb-2"
                placeholder="Your Age"
                required
                value={editedAge}
                onChange={(e)=>{
                  setEditedAge(e.target.value);
                }}
              />
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-dark btn-sm mx-1" type="submit">Submit</button>
            <button className="btn btn-dark btn-sm mx-1" onClick={handeltoggle}>
              Cancel
            </button>
          </div>
        </div>
        </form>
      )}
    </div>
  );
}

export default InfoCard;
