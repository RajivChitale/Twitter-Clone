import Navbar from './Navbar.js';
import './2col.css';
import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import ReplyBox from './ReplyBox.js';
import URL from './globalvars.js';


const Reply = () => {
    const [post, setPost] = useState([]);
    const [parentPost, setParentPost] = useState([]);
    const location = (useLocation().pathname).split('/')[2];
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
    const postsByParent = async () => {
        const objlist = await axios.get(`${URL}/postlist/parent/${location}`);
        const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
        setPost(postlist);
        setParentPost(<Post postid={location} key={location} user={username}/> )
    }

    useEffect(() => {
        postsByParent();
    }, [location, username]);
    return (
        <div className='Page'>
            <Navbar active="/Home" />
            <div className='Reply'>
                {parentPost}
                <div>
                    <ReplyBox username={username} parentId={location} />
                    {post}
                </div>
            </div>

        </div>
    );
}

export default Reply;