import Feed from './Feed.js';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import URL from './globalvars.js';
import './2col.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlipMove from "react-flip-move";
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
const Bookmarks = () => {

  const [post, setPost] = useState([]);
  const [username, setUser] = useState("");
  const navigate = useNavigate();
  const Auth = async () => {
    let usertoken = document.cookie;
    usertoken = usertoken.split('=:')[1];
    console.log(usertoken);
    try {
      const user = await axios.post(`${URL}/checkToken`, {
        token: usertoken
      });
      if (user.data.success) {
        setUser(user.data.username);
      }
      else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  }
  useEffect(() => {
    Auth();
  }, []);
  const bookmarkedPosts = async () => {
    //await axios.post(`${URL}/bookmarks`, { username: username, postid: "10" });
    const objlist = await axios.get(`${URL}/bookmarklist/user/${username}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
    setPost(postlist);
  }

  useEffect(() => {
    if(username!=="")
    { bookmarkedPosts(); }
  }, [username]);

  return (
    <div className='Home'>
      <Navbar active="/Bookmarks" />
      <div className='Feed'>
        <div className='Feed_Header'>Bookmarks</div>
        {post}
      </div >
    </div >
  );
}

export default Bookmarks;