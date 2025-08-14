import React, { useEffect, useState } from "react";
import {
  CameraIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import ProfileTop from "./ProfileTop";
import PostCard from "./PostCard";
import InfoCard from "./InfoCard";
import RightSidebar from "./RightSidebar";
import AddPost from "./AddPost";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const getPostUrl = "http://localhost:5000/users/getUserPosts";
const checkUserInfoUrl="http://localhost:5000/users/getInfo";

function Profile() {
  // const [name, setName] = useState("John Doe");
  // const [phone, setPhone] = useState("+123456789");
  // const [headline, setHeadline] = useState("Full Stack Developer | Dreamer");
  // const [profilePic, setProfilePic] = useState(null);
  // const [coverPic, setCoverPic] = useState(
  //   "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1500&q=80"
  // );
  const navigate = useNavigate();
  const location = useLocation();
  const { userid } = location.state || {}; // safely get userid
  console.log("UserID:", userid);
  if (userid === undefined) {
    navigate("/SignUp");
  }


  useEffect(()=>{
    const fetchUserInfo= async()=>{
       if(userid==undefined){
       navigate("/SignUp");
    }
      const result=await axios.get(checkUserInfoUrl+`/${userid}`);
      console.log("Get User Info Res"+JSON.stringify(result.data));
      
      if(result.data.code==-1)
      {
      navigate("/addAccount", { state: { userid: userid } });

      }
      else if(result.data.code==-2)
      {
        navigate("/SignUp" );
      }
      else if(result.data.code==1){
        console.log("User Info Is"+result.data.datarr)
      }
    }
   fetchUserInfo();
  },[userid]);




  const [posts, setPosts] = useState([]);
  useEffect(() => {
     if(!userid){
       navigate("/SignUp");
    }
    const fetchUserPosts = async () => {
      
      try {
        const res = await axios.get(getPostUrl + `/${userid}`, {
          withCredentials: true,
        });
        console.log(res.data);

        console.log("res from api is" + JSON.stringify(res.data));
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.warn("Expected an array, got:", res.data);
          setPosts([]);
        }
      } catch (error) {
        console.error("Error Happened", error);
      }
    };
    fetchUserPosts();
  }, [userid]);

  function handleUpdatePost(post) {
    setPosts((prev) => {
      return [...prev, post];
    });
  }
  function handleDeletPost(id) {
    setPosts(
      posts.filter((post) => {
        return post.id != id;
      })
    );
  }
  function handleEditPost(post) {
    setPosts(
      posts.map((inpost) => {
        if (inpost.id === post.id) {
          return {
            ...inpost,
            img_url: post.img_url,
            title: post.title,
            content: post.content,  
          };
        }
        return inpost; // return the unchanged one
      })
    );
  }

  // const handleProfileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setProfilePic(URL.createObjectURL(file));
  // };

  // const handleCoverUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setCoverPic(URL.createObjectURL(file));
  // };

  return (
    <div className="gradient-background profile_main">
      <ProfileTop
        name="walid Nasr"
        photoSrc="/assets/myphoto.jpg"
        backgroundSrc="/assets/nature1.jpg"
        phone="01024570574"
        job="Engineer"
      />

      {/* 3-column layout */}
      <div className="profile_container">
        {/* Left */}
        <div className="left">
          <InfoCard
            phone="+20 102 457 0574"
            email="walid.nasr@example.com"
            age="21"
          />
          <AddPost userid={userid} handleupdate={handleUpdatePost} />
        </div>

        {/* Middle — all posts stacked in a column */}
        <div className="flex flex-col gap-4 middle">
          {/* {posts[0] &&Array.isArray(posts) && */}
          {posts.length > 0
            ? posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  imageUrl={post.img_url}
                  title={post.title}
                  body={post.content}
                  ondelte={handleDeletPost}
                  onedit={handleEditPost}
                />
              ))
            : (
            <h1 className="header">No Posts Yet Add Now</h1>)}
        </div>

        {/* Right */}
        <div className="bg-gray-100 p-4 right">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default Profile;
