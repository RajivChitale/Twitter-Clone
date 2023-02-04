import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './TweetBox.css';
import URL from './globalvars.js';

const ReplyBox = ({ username, parentId }) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const navigate = useNavigate();
    const savePost = async () => {
        const mes = await axios.post(`${URL}/postlist`, {
            parentid: parentId,
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
        <div className="ReplyBox">
            <form>
                <input
                    onChange={(e) => setTweetMessage(e.target.value)}
                    value={tweetMessage}
                    placeholder="Reply Message"
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
                        Reply
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReplyBox;