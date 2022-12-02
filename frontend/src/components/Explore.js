import Feed from './Feed.js';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import './2col.css';
import { MagnifyingGlass } from 'phosphor-react';

import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";

const Explore = (username) => {
  const [showTrending, setShowTrending] = useState(true);
  const [searchOrder, setSearchOrder] = useState("time");
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const trendingHashtags = async () => {
    if (showTrending) {
      const hours = 24;
      const objlist = await axios.get(`http://192.168.51.81:5000/hashtaglist/${hours}`);
      const hashlist = await objlist.data.map((obj) => <div key={obj.hashtag}> {obj.hashtag} {obj.count}  </div>);
      setHashtags(hashlist);
    }
  }

  const postsBySearchTime = async () => {
    const objlist = await axios.post('http://192.168.51.81:5000/postlist/searchtime', { search: searchText });
    //console.log(objlist.data);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
    setPost(postlist);
  }

  const postsBySearchLikes = async () => {
    const objlist = await axios.post('http://192.168.51.81:5000/postlist/searchlikes', { search: searchText });
    //console.log(objlist.data);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
    setPost(postlist);
  }

  const search = () => {
    postsBySearchLikes();
    //if (searchOrder === "time") { await postsBySearchTime(); }
    //if (searchOrder === "likes") { await postsBySearchLikes(); }
  }
  useEffect(() => {
    trendingHashtags();
  }, []);


  return (
    <div className='Explore'>
      <Navbar active="/Explore" />
      <div className='Exploring'>
        <div className='Explore_Header'>
          Explore
          <form className='InputBox'>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search for Something"
              className='textInput'
              type="text"
            />
            <button
              onClick={search()}
              type="submit"
              className="searchButton"
            >
              <MagnifyingGlass />
            </button>
          </form>
        </div>
        <div className='Body'>
          <div className='Body_Header'>
            Trending Hashtags
          </div>
          <div className='Hashtags'>
            {hashtags}
          </div>
          {post}
        </div>
      </div>
    </div >
  );
}

export default Explore;
