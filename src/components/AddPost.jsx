import React, { useState } from "react";
import axios from "axios";

const addPostUrl = "http://localhost:5000/users/addPost";

function AddPost(props) {
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _formData = new FormData();
    _formData.append("title", formData.title);
    _formData.append("content", formData.content);
    _formData.append("file", formData.image);
    _formData.append("userId", props.userid);
    console.log("sending Pst" + _formData);
    const result = await axios.post(addPostUrl, _formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(result.data);
    const post = {
      content: formData.content,
      img_url: result.data.img,
      title: formData.title,
      id: result.data.id,
    };
    props.handleupdate(post);
    setFormData((prev) => ({
      ...prev,
      title: "",
      content: "",
    }));
  };

  return (
    <div className="text-center my-4 container ">
      <div className="">
        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          encType="multipart/form-data"
        >
          <input
            name="image"
            type="file"
            className="form-control mb-2"
            required
            onChange={handleChange}
          />
          <input
            name="title"
            className="form-control mb-2"
            placeholder="Post Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            className="form-control mb-2"
            placeholder="Post Content"
            required
            style={{ height: "100px" }}
            value={formData.content}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-dark">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
