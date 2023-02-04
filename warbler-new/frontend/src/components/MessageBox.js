import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './TweetBox.css';
import URL from './globalvars.js';


const MessageBox = ({ username, receiver }) => {
    const [messageText, setMessageText] = useState("");
    const [messageImage, setMessageImage] = useState("");
    //const navigate = useNavigate();
    const saveMessage = async () => {
        if(username !== null){
        const mes = await axios.post(`${URL}/messagelist`, {
            parentid: null,
            shareid: null,
            sender: username,
            receiver: receiver,
            text: messageText,
            media1: messageImage
        });
        console.log(mes.data.message);
        if(mes.data.message==="Spam"){window.alert("Possible spam detected. Please try again later."); }
        }
        setMessageText("");
        setMessageImage("");
    }

    return (
        <div className="MessageBox">
            <form>
                <input
                    onChange={(e) => setMessageText(e.target.value)}
                    value={messageText}
                    placeholder="Type your message here"
                    className='textInput'
                    type="text"
                />
                <div className='Line2'>
                    <input
                        value={messageImage}
                        onChange={(e) => setMessageImage(e.target.value)}
                        className="imageInput"
                        placeholder="Image "
                        type="text"
                    />

                    <button
                        onClick={saveMessage}
                        type="submit"
                        className="tweetButton"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MessageBox;