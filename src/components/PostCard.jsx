import React, { use, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";

const deletePostUrl = `${process.env.REACT_APP_API_URL}/users/deletePost`;
const editPostUrl = `${process.env.REACT_APP_API_URL}/users/editPost`;

function PostCard({ id, imageUrl, title, body,ondelte,onedit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);
  const [editFile,setEditFile]=useState(null);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditTitle(title);
    setEditBody(body);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleedit(id, editTitle, editBody);
    setIsEditing(false);
  };

  async function handleDelete(id){
     const res= await axios.get(deletePostUrl+`/${id}`,{withCredentials: true});
     console.log(res.data);
     ondelte(id);
  }
  async function handleedit(id, editTitle, editBody){
     const _formData=new FormData();
      _formData.append("title", editTitle);
      _formData.append("content", editBody);
      _formData.append("file", editFile);
      _formData.append("postId",id);
      const result= await axios.post(editPostUrl,_formData,{
      headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result);
      const updatedimgurl=result.data.url;
      const post = {
      content: editBody,
      img_url: updatedimgurl,
      title: editTitle,
      id:id,
    };
    console.log("Sending To parent Post "+ JSON.stringify(post));
    onedit(post);
     return 1;
  }

  return (
    <div className="d-flex flex-column align-items-center  " >
      {/* Default view */}
      {!isEditing && (
        <div className="profile-card" >
          <img
            className="profile-card-img"
            src={`http://localhost:5000${imageUrl}`}
            alt="Card"
            style={{ "display":"block","maxWidth": "100%", "height": "auto" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <div className="card-actions">
              <button
                className="btn btn-dark m-2"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
              <button
                className="btn btn-dark m-2 edit-btn"
                onClick={handleEditToggle}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit form */}
      {isEditing && (
        <div className="card m-3 p-3" >
          <ImageUpload
           imageUrl={imageUrl}
           onFileFinished={(file)=>{
            setEditFile(file);
            console.log("Edited file is"+file);
           }} />
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Post Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <textarea
              className="form-control mb-2"
              placeholder="Post Content"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
              style={{ "height": "100px" }}
            />
            <div className="d-flex justify-content-center">
              <button
               type="submit" 
               className="btn btn-dark m-2"

               >
                Update Post
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={handleEditToggle}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostCard;
