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
import Spinner from "./Spinner";

const getPostUrl = "http://localhost:5000/users/getUserPosts";
const checkUserInfoUrl="http://localhost:5000/users/getInfo";

function Profile() {
   const navigate = useNavigate();
  const location = useLocation();
  const { userid } = location.state || {}; // safely get userid
  console.log("UserID:", userid);
  const [posts, setPosts] = useState([]);
  const [userInfo,setUserInfo]=useState({});
  const [loading, setLoading] = useState(true); // track loading state

  

  useEffect(()=>{
    if(!userid){
       navigate("/SignUp");
       return;
    }
    const fetchUserInfo= async()=>{
      try{
      const result=await axios.get(checkUserInfoUrl+`/${userid}`);
      if(result.data.code==-1)
      {
      navigate("/addAccount", { state: { userid: userid } });
      }
      else if(result.data.code==-2)
      {
        navigate("/SignUp" );
      }
      else if(result.data.code==1){
        setUserInfo(result.data.datarr);
        console.log("User Info Is"+JSON.stringify(result.data.datarr));
      }
    }catch(err)
    {
      console.log("Error happened "+err);
    }
    finally{
      setLoading(false);
    }
    }
   fetchUserInfo();
  },[userid]);



  useEffect(() => {
     if(!userid){
       navigate("/SignUp");
       return;
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



  if (loading) {
    return (
     <Spinner />
    );
  }

  //functions

  function handleUpdatePost(post) {
    setPosts((prev) => {
      return [...prev,post];
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
  function handleInfoChange(newPhone,newEmail,newAge){
    setUserInfo((prev)=>{
      return{
        ...prev,
        phone:newPhone,
        email:newEmail,
        age:newAge
      }
    })
  }
  function handleProfilePicUpdate(newUrl){
    setUserInfo((prev)=>{
      return({
        ...prev,
        profilepic_url:newUrl
      });
  });
  }

  function handleCoverPicUpdate(newUrl){
    setUserInfo((prev)=>{
      return({
        ...prev,
        coverpic_url:newUrl
      });
  });
  }





  


  return (
    <div className="gradient-background profile_main">
      <ProfileTop
        name={userInfo.name}
        photoSrc={userInfo.profilepic_url}
        backgroundSrc={userInfo.coverpic_url}
        userId={userid}
        handleprofileupdate={handleProfilePicUpdate}
        handlecoverupdate={handleCoverPicUpdate}
      />

      {/* 3-column layout */}
      <div className="profile_container">
        {/* Left */}
        <div className="left">
          <InfoCard
            phone={userInfo.phone}
            email={userInfo.email}
            age={userInfo.age}
            userId={userid}
            handlechange={handleInfoChange}
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
            <h1 className="header">No Posts Yet... Add Now !</h1>)}
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
