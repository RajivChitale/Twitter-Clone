import Feed from './Feed.js';
import Navbar from './Navbar.js';
import Sidebar from './Sidebar.js';
import './2col.css';
import { MagnifyingGlass } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
import URL from './globalvars.js';


const Explore = () => {
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

  const [trending, setTrending] = useState([]);
  const [searchOrder, setSearchOrder] = useState("time");
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const trendingHashtags = async () => {
    const hours = 24;
    const objlist = await axios.get(`${URL}/hashtaglist/${hours}`);
    const hashlist = await objlist.data.map((obj) => <div key={obj.hashtag}> {obj.hashtag} x{obj.count} </div>);
    setHashtags(  
      <div>
      <div className='Body_Header'>
         Trending Hashtags
      </div>
      <div className='Hashtags'>
         {hashlist}
      </div>
    </div>);
  }

  const postsBySearchTime = async () => {
    const objlist = await axios.post(`${URL}/postlist/searchtime`, { search: searchText });
    //console.log(objlist.data);
    const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
    setPost(postlist);
  }

  const postsBySearchLikes = async () => {
    const objlist = await axios.post(`${URL}/postlist/searchlikes`, { search: searchText });
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

  useEffect( ()=>{
    if(searchText==="" || searchText===null)
    {
      setTrending(hashtags)
      setPost();
    }
    else{
      search();
      setTrending();
    }

    }, [searchText, hashtags]
  );
 

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
            <button onClick={search} type="submit" className="searchButton">
              <MagnifyingGlass />
            </button>
          </form>
        </div>
        <div className='Body'>
          {trending}
          {post}
        </div>
      </div>
    </div >
  );
}

export default Explore;
