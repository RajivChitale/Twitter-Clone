import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './TweetBox.css';
import URL from './globalvars.js';


const TweetBox = ({ username }) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    //const navigate = useNavigate();
    const savePost = async () => {
        const mes = await axios.post(`${URL}/postlist`, {
            parentid: null,
            retweetid: null,
            username: username,
            text: tweetMessage,
            media1: tweetImage
        });
        console.log(mes.data.message);
        if(mes.data.message==="Spam"){window.alert("Possible spam detected. Please try again later."); }
        setTweetMessage("");
        setTweetImage("");
    }

    return (
        <div className="TweetBox">
            <form>
                <input
                    onChange={(e) => setTweetMessage(e.target.value)}
                    value={tweetMessage}
                    placeholder="What's happening?"
                    className='textInput'
                    type="text"
                />
                <div className='Line2'>
                    <input
                        value={tweetImage}
                        onChange={(e) => setTweetImage(e.target.value)}
                        className="imageInput"
                        placeholder="Image "
                        type="text"
                    />

                    <button
                        onClick={savePost}
                        type="submit"
                        className="tweetButton"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;