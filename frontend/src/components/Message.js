import React, { useState, useEffect } from "react";
import "./Post.css";
import { Heart, Share, Chat, Repeat, BookmarkSimple, ArrowBendUpRight } from "phosphor-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from './globalvars.js';


const Message = ({messageid, user}) => {
    messageid = parseInt(messageid);
    const [username, setUsername] = useState('');
    const [receiver, setReceiver] = useState('');
    const [parentId, setParentId] = useState(0);
    const [displayname, setDisplayname] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [postTime, setPostTime] = useState('');
    const [avatar, setAvatar] = useState('');
    const navigate = useNavigate();
    const [timeGap, setTimeGap] = useState('');
    const [self, setSelf] = useState(true);


    const [parentUser, setParentUser] = useState('');
    const [retweetHeader, setRetweetHeader] = useState([]);
  
    const gap = (t) => {
        let now = new Date().getTime();
        if (now - t < 60 * 1000) {
            let sec = (now - t) / 1000;
            sec = sec - sec % 1;  //floor func
            return `${sec} sec ago`
        }
        else if (now - t < 60 * 60 * 1000) {
            let min = (now - t) / (60 * 1000);
            min = min - min % 1;
            return `${min} min ago`
        }
        else if (now - t < 24 * 60 * 60 * 1000) {
            let hrs = (now - t) / (60 * 60 * 1000);
            hrs = hrs - hrs % 1;
            return `${hrs} hr ago`

        }
        else {
            const d = new Date(parseInt(t));
            return d.toLocaleDateString("en-IN");
            /*let day = (now - t) / (24 * 60 * 60 * 1000) % 1;
            day = day - day % 1;
            return `${day} days ago` */
        }
    }

    const formatTime = (t) => {
        var d = new Date(parseInt(t));
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " · " + d.toLocaleDateString("en-IN");
    }

    //fetch data for a post
    const getMessage = async () => {
        var message = await axios.get(`${URL}/messagelist/id/${messageid}`);
        console.log(message);
        var poster = await axios.get(`${URL}/userlist/${message.data.sender}`);
       
        setDisplayname(poster.data.displayname);
        setAvatar(poster.data.displaypic);
        setUsername(message.data.sender);
        setReceiver(message.data.receiver);
        setParentId(message.data.parentid);
        setText(message.data.text);
        if(message.data.media1 !== null) {setImage(<img src={message.data.media1} alt="" className="messageImage" />)}
        setTimeGap(gap(message.data.posttime));
        setPostTime(formatTime(message.data.posttime));

        if(user === message.data.receiver){setSelf(false);}
        if(user === message.data.sender){setSelf(true);}

    }

    useEffect(() => {
        getMessage();
    }, []);


    const gotoUser = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/User/' + username);
    }


    return (
        <div className={"message_"+self} >
            <div className="message_body">
                    <div className="post_header">
                        <div className="message_text">
                            <p>{text}</p>
                            {image}
                        </div>
                        <div className="post_headerText">
                            <h3>
                                <span className="post_time" > {username} · {timeGap} </span>
                            </h3>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Message;