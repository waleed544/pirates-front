import React from "react";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
const editProfilePicUrl = `${process.env.REACT_APP_API_URL}/users/updateUserProfilePic`;
const editCoverPicUrl =`${process.env.REACT_APP_API_URL}/users/updateUserCoverPic`;



export default function ProfileCard({ name, photoSrc, backgroundSrc,userId,handleprofileupdate, handlecoverupdate}) {
  const profilePicRef = useRef();
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const coverPicRef = useRef();
  const [coverPicPreview, setCoverPicPreview] = useState("");
  const [isEditing,setIsEditing]=useState(false);
  const [profilePicFile,setProfilePicFile]=useState(null);
  const [coverPicFile,setCoverPicFile]=useState(null);

  function toggleEdit(){
    setIsEditing(false);
    setProfilePicPreview("");
    setCoverPicPreview("");
    setProfilePicFile(null);
    setCoverPicFile(null);
  }

  function handleProfileClick() {
    profilePicRef.current.click();
    setIsEditing(true);
  }
  function handleCoverClick() {
    coverPicRef.current.click();
    setIsEditing(true);
  }

  function handleProfileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
      setProfilePicFile(file);
    }
  }
  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (file) {
      setCoverPicPreview(URL.createObjectURL(file));
      setCoverPicFile(file);
    }
  }
  async function handleEditPics(){
    if(profilePicFile){
      const formData=new FormData();
      formData.append("profilePic",profilePicFile);
      const result =await axios.post(editProfilePicUrl+`/${userId}`,formData,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(result.data.status==1){
      console.log("Updated Successfully");
      console.log("New Url is"+JSON.stringify(result.data.newUrl));
     handleprofileupdate(result.data.newUrl);
    }
  }
  if(coverPicFile){
     const formData=new FormData();
      formData.append("coverPic",coverPicFile);
      const result =await axios.post(editCoverPicUrl+`/${userId}`,formData,{
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(result.data.status==1){
      console.log("Updated Successfully");
      console.log("New Url is"+JSON.stringify(result.data.newUrl));
      handlecoverupdate(result.data.newUrl);
    }

  }
  toggleEdit();
}

  return (
    <div>
    <div
      className="text-center coverpic"
      style={{
        backgroundImage: `url(${
          !coverPicPreview
            ? `http://localhost:5000${backgroundSrc}`
            : coverPicPreview
        })`,
      }}
    >
      <input
        type="file"
        ref={coverPicRef}
        style={{ display: "none" }}
        onChange={handleCoverChange}
      />
      <div className="cover-name">
        <h1 className="display-5 fw-bold mx-5">{name}</h1>
      </div>
      <div className="insideHiddenDiv"  onClick={handleCoverClick}></div>
      <input
        type="file"
        ref={profilePicRef}
        style={{ display: "none" }}
        onChange={handleProfileChange}
      />
      <img
        className="profileImg"
        src={
          !profilePicPreview
            ? `http://localhost:5000${photoSrc}`
            : profilePicPreview
        }
        alt={`${name}'s photo`}
        onClick={(e) => {
          e.stopPropagation(); // prevent the click from triggering the cover click
          handleProfileClick();
        }}
      />
    </div>
    { <div className={`container editButtonsContainer ${isEditing ? "show" : ""}`}>
      <div className="row">
         <button className="btn small-btn btn-light col-lg-1 col-sm-5 col-5 m-2" onClick={toggleEdit}>Cancel</button>
         <button className="btn  small-btn btn-light col-lg-1  col-sm-5 col-5 m-2" onClick={handleEditPics}>Upload</button>
      </div>
     </div>}
    </div>
   
  );
}
