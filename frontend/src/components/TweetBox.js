import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './TweetBox.css';
const TweetBox = ({ username }) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const navigate = useNavigate();
    const savePost = async () => {
        const mes = await axios.post('http://192.168.51.81:5000/postlist', {
            parentId: null,
            retweetId: null,
            username: username,
            text: tweetMessage,
            media1: tweetImage,
        });
        console.log(mes.data.message);
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
                        Tweet
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;