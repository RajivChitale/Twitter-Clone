import React, { useState, useEffect } from 'react';
import FlipMove from "react-flip-move";
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
import TweetBox from './TweetBox';


/*
options to explore:
search, order by time/likes
view by time
*/

const Feed = ({ username }) => {

  const [post, setPost] = useState([]);
  /*useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => doc.data()))
    );}, []);
    */

  const postsByTime = async () => {
    const objlist = await axios.get('http://192.168.51.81:5000/postlist/time');
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} />);
    setPost(postlist);
  }

  const postsByLikes = async () => {
    const objlist = await axios.get('http://192.168.51.81:5000/postlist/likes');
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} />);
    setPost(postlist);
  }

  //use the following for profile page
  const senderName = { username };
  const postsBySender = async () => {
    const objlist = await axios.get(`http://192.168.51.81:5000/postlist/sender/${senderName}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} />);
    setPost(postlist);
  }
  //use the following for replies
  const parentid = 2;
  const postsByParent = async () => {
    const objlist = await axios.get(`http://192.168.51.81:5000/postlist/time/${parentid}`);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} />);
    setPost(postlist);
  }

  const thresholdHours = 48;
  const recentPosts = async () => {
    const objlist = await axios.get(`http://192.168.51.81:5000/postlist/recent/${thresholdHours}`);
    console.log(username);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} user={username} />);
    setPost(postlist);
  }

  //edit this to order in the required way
  //CHOOSE ONE OF ABOVE FUNCTIONS
  useEffect(() => {
    //postsBySearchTime();
    recentPosts();
  }, []);


  return (
    <div className='Feed'>

      <div className='Feed_Header'>Feed</div>
      <TweetBox username={username} />
      {post}
    </div >
  );
}

export default Feed;