import React from "react";

function PostCardHome({profilePicUrl,name, imageUrl, title, body }) {
  return (
      <div className="home-card">
        <div className="HomeCardInfo">
          <img className="SmallProfilePic"
           src={`${process.env.REACT_APP_API_URL}${profilePicUrl}`}
           />
          <p>{name}</p>
        </div>
        <img
          className="home-card-img"
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          alt="Card"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <div className="card-actions">
            <button className="btn btn-dark m-2 small-btn-home">🤍</button>
            <button className="btn btn-dark m-2 small-btn-home"> 🗨️ </button>
          </div>
        </div>
      </div>
  );
}
export default PostCardHome;
