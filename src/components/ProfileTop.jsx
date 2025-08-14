// ProfileCard.jsx
import React from "react";

export default function ProfileCard({ name, photoSrc, backgroundSrc }) {
  return (
    <div
      className="px-4 py-5 text-center"
      id="cont1"
      style={{
        borderRadius: "10px",
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="display-5 fw-bold mx-5 img-fluid">{name}</h1>
      <img
        id="my_img"
        className="m-5"
        src={photoSrc}
        alt={`${name}'s photo`}
      />
      <div className="col-lg-6 mx-auto"></div>
    </div>
  );
}
