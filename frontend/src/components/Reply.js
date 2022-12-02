import Navbar from './Navbar.js';
import './2col.css';
import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from './Post.js';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import ReplyBox from './ReplyBox.js';


const Reply = () => {
    const [post, setPost] = useState([]);
    const location = (useLocation().pathname).split('/')[2];
    const [username, setUser] = useState("");
    const navigate = useNavigate();
    const Auth = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        const user = await axios.post('http://192.168.51.81:5000/checkToken', {
            token: usertoken
        });
        if (user.data.success) {
            setUser(user.data.username);
        }
        else {
            navigate("/");
        }
    }
    const postsByParent = async () => {
        const objlist = await axios.get(`http://192.168.51.81:5000/postlist/parent/${location}`);
        const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
        console.log(postlist);
        setPost(postlist);
    }

    useEffect(() => {
        Auth();
    }, []);
    useEffect(() => {
        postsByParent();
    }, []);
    return (
        <div className='Page'>
            <Navbar active="/Home" />
            <div className='Reply'>
                <Post postid={location} />
                <div>
                    <ReplyBox username={username} parentId={location} />
                    {post}
                </div>
            </div>

        </div>
    );
}

export default Reply;