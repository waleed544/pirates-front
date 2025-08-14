import React, { useRef }  from "react";
import {useState} from "react"
function ImageUpload({ imageUrl, onFileFinished }) {
  const fileInputRef = useRef();
  const [previewUrl,setPreviewUrl]=useState("");

  const handleImageClick = () => {
    fileInputRef.current.click(); // programmatically open file picker
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // const url=`/uploads/${file.name}`;
    if (file && onFileFinished) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileFinished(file);
    }
  };

  return (
    <div>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Image */}
      <img
        className="img-fluid mb-3"
        src={previewUrl || `http://localhost:5000${imageUrl}`}
        alt="Card"
        style={{ width: "auto", maxWidth: "100%", height: "auto", cursor: "pointer" }}
        onClick={handleImageClick}
      />
    </div>
  );
}

export default ImageUpload;
