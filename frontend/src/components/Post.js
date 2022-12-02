import React, { useState, useEffect } from "react";
import "./Post.css";
import { Heart, Share, Chat, BookmarkSimple } from "phosphor-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* WILL CONNECT WITH BACKEND LATER
const post = await axios.get('http://192.168.51.81:5000/postlist', {
    postid: "p1";
});

const poster = await axios.get('http://192.168.51.81:5000/postlist', {
    username: post.username;
});
*/
function action_Icon({ active, Icon, num }) {
    if (active.active === true) {
        return (
            <div className={`action_Icon-active`}>
                {Icon}
                <h3>{num}</h3>
            </div>
        );
    }
    else {
        return (
            <div className={`action_Icon`}>
                {Icon}
                <h3>{num}</h3>
            </div>
        );
    }
}

const Post = ({ postid, user }) => {

    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [postTime, setPostTime] = useState('');
    const [avatar, setAvatar] = useState('');
    const [likes, setLikes] = useState(0);
    const [replies, setReplies] = useState(0);
    const [retweets, setRetweets] = useState(0);
    const navigate = useNavigate();
    const [timeGap, setTimeGap] = useState('');
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
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
    const getPost = async () => {

        const post = await axios.get(`http://192.168.51.81:5000/postlist/id/${postid}`);
        /*
        const post = await axios.post('http://192.168.51.81:5000/postlist/id', { 
             postid: postid
        });
        */
        setUsername(post.data.username);
        setText(post.data.text);
        setAvatar(post.data.displaypic);
        setImage(post.data.media1);
        setLikes(post.data.likes);
        setReplies(post.data.replies);
        setRetweets(post.data.retweets);
        setTimeGap(gap(post.data.posttime));
        setPostTime(formatTime(post.data.posttime));

        const poster = await axios.get(`http://192.168.51.81:5000/userlist/${post.data.username}`);
        setDisplayname(poster.data.displayname);
    }

    useEffect(() => {
        getPost();
    }, []
    );

    //finds reply count of a post
    const replyCount = async () => {
        const objlist = await axios.get(`http://192.168.51.81:5000/postlist/parent/${postid}`);
        setReplies(objlist.data.length);
    }

    useEffect(() => {
        replyCount();
    }, []
    );

    //finds like count and whether user has liked a post
    const likeCount = async () => {
        const objlist = await axios.get(`http://192.168.51.81:5000/likelist/id/${postid}`);
        setReplies(objlist.data.length);
        if (objlist.data.includes({ username: user })) {
            setLiked(true);
        }
    }

    useEffect(() => {
        likeCount();
    }, []
    );

    //like and unlike
    const toggleLike = async () => {
        if (liked === false) {
            setLikes(likes + 1);
            setLiked(true);
            const message1 = await axios.post(`http://192.168.51.81:5000/likelist`, { username: user, postid: postid });
            console.log(message1); //
        }
        else if (liked === true) {
            setLikes(likes - 1);
            setLiked(false);
            const message2 = await axios.delete(`http://192.168.51.81:5000/likelist`, { username: user, postid: postid });
            console.log(message2);
        }
    }
    const bookmark = async () => {
        const bookmarklist = await axios.get(`http://192.168.51.81:5000/bookmarks/user/${user}`);
    }
    const reply = async () => {
        navigate('/Reply/' + postid);
    }
    /*
        const poster = await axios.get('http://192.168.51.81:5000/userlist', {
            username: post.data.username
        });
    */
    //avatar = poster.displaypic;
    //displayname = poster.data.displayname;

    return (
        <div className="post">
            <div className="post_body">
                <div className="clickable_area" onClick={reply}>
                    <div className="post_header">
                        <div className="post_headerText">
                            <h3>
                                {displayname}{" "}
                                <span className="post_headerSpecial">
                                    @{username} {" · "}
                                    {timeGap}
                                </span>
                            </h3>
                        </div>
                        <div className="post_headerDescription">
                            <p>{text}</p>
                        </div>
                    </div>
                    <img src={image} alt="" className="postImage" />
                </div>
                <div className="post_footer">
                    <button className="Heart" onClick={toggleLike}><Heart />{likes}</button>
                    {/*<button onClick={toggleLike}><action_Icon active={liked} Icon={Heart} num={likes} /></button>*/}
                    <button className="Replies" onClick={reply}><Chat />{replies}</button>
                    <button className="Bookmark" onClick={bookmark}><BookmarkSimple /></button>
                </div>
            </div>
        </div>
    );
}


export default Post;