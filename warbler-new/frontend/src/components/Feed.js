import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlipMove from "react-flip-move";
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
import TweetBox from './TweetBox';
import URL from './globalvars.js';


/*
options to explore:
search, order by time/likes
view by time
*/

const Feed = () => {
  const [username, setUser] = useState("");
  const navigate = useNavigate();
  const Auth = async () => {
    let usertoken = document.cookie;
    usertoken = usertoken.split('=:')[1];
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
  console.log(username);
  const [post, setPost] = useState([]);
  /*useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => doc.data()))
    );}, []);
    */

  const postsByTime = async () => {
    const objlist = await axios.get(`${URL}/postlist/time`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} key={obj.postid} />);
    setPost(postlist);
  }

  const postsByLikes = async () => {
    const objlist = await axios.get(`${URL}/postlist/likes`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} key={obj.postid} />);
    setPost(postlist);
  }

  //use the following for profile page
  const senderName = { username };
  const postsBySender = async () => {
    const objlist = await axios.get(`${URL}/postlist/sender/${senderName}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} key={obj.postid} />);
    setPost(postlist);
  }
  //use the following for replies
  const parentid = 2;
  const postsByParent = async () => {
    const objlist = await axios.get(`${URL}/postlist/time/${parentid}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} key={obj.postid} />);
    setPost(postlist);
  }

  const thresholdHours = 48;
  const recentPosts = async () => {
    const objlist = await axios.get(`${URL}/postlist/recent/${thresholdHours}`);

    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} key={obj.postid} />);
    setPost(postlist);
  }

  const customFeed = async () => {
    const objlist = await axios.get(`${URL}/postlist/custom/${username}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj} user={username} key={obj} />);
    setPost(postlist);
  }

  //edit this to order in the required way
  //CHOOSE ONE OF ABOVE FUNCTIONS
  useEffect(() => {
    //postsBySearchTime();
    if(username!== "")
    {
      //recentPosts();
      customFeed(); //following first then others
    }
  }, [username]);


  return (
    <div className='Feed'>

      <div className='Feed_Header'>Feed</div>
      <TweetBox username={username} />
      {post}
    </div >
  );
}

export default Feed;