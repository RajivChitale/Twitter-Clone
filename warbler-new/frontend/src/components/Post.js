import React, { useState, useEffect } from "react";
import "./Post.css";
import { Heart, Share, Chat, Repeat, BookmarkSimple, ArrowBendUpRight } from "phosphor-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from './globalvars.js';


const Post = ({ postid, user }) => {
    postid = parseInt(postid);
    const [username, setUsername] = useState('');
    const [parentId, setParentId] = useState(0);
    const [retweetId, setRetweetId] = useState(0);
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
    const [retweeted, setRetweeted] = useState(false);


    const [parentUser, setParentUser] = useState('');
    const [replyingTo, setReplyingTo] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [retweetHeader, setRetweetHeader] = useState([]);
    const [retweeter, setRetweeter] = useState('');
  
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
        var post = await axios.get(`${URL}/postlist/id/${postid}`);
        var poster = await axios.get(`${URL}/userlist/${post.data.username}`);
       
        setDisplayname(poster.data.displayname);
        setUsername(post.data.username);
        setParentId(post.data.parentid);
        setRetweetId(post.data.retweetid);
        setText(post.data.text);
        if(poster.data.displaypic === null || poster.data.displaypic === '')
            {setAvatar(<img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" className="post_avatar" alt="profile pic" />); }
        else
            {setAvatar(<img src={poster.data.displaypic} className="post_avatar" alt="profile picture" />); }
        setImage(post.data.media1);
        setLikes(post.data.likes);
        setReplies(post.data.replies);
        setRetweets(post.data.retweets);
        setTimeGap(gap(post.data.posttime));
        setPostTime(formatTime(post.data.posttime));

        if(post.data.parentid !== null)
        {
            const parentObj = await axios.get(`${URL}/postlist/id/${post.data.parentid}`);
            setParentUser(parentObj.data.username);
        }

        const objlist1 = await axios.get(`${URL}/likelist/id/${postid}`);
        if (objlist1.data.some( obj => obj.username === user )) 
            { setLiked(true); console.log("was liked"); }

        const objlist2 = await axios.get(`${URL}/bookmarklist/user/${user}`);
        if (objlist2.data.some( obj => obj.postid == postid)) 
             {setBookmarked(true);}

        const objlist3 = await axios.get(`${URL}/retweetlist/user/${user}`);
        if (objlist3.data.some( obj => obj.retweetid == postid)) 
             {setRetweeted(true);}
    }

    useEffect(() => {
        getPost();
    }, []);

    //portion which leads to parent post

    

    //like and unlike
    const toggleLike = async () => {
        if (liked === false) {
            setLikes(likes + 1);
            setLiked(true);
            await axios.post(`${URL}/likelist`, { username: user, postid: postid });
        }
        else if (liked === true) {
            setLikes(likes - 1);
            setLiked(false);
            await axios.post(`${URL}/likelist/delete`, { username: user, postid: postid });
        }
    } 
 
    const toggleBookmark = async () => {
        if (bookmarked === false) {
            setBookmarked(true);
            await axios.post(`${URL}/bookmarklist`, { username: user, postid: postid });
        }
        else if (bookmarked === true) {
            setBookmarked(false);
            await axios.post(`${URL}/bookmarklist/delete`, { username: user, postid: postid });
        }
    }

    const toggleRetweet = async () => {
        if (retweeted === false) {
            setRetweeted(true);
            setRetweets(retweets + 1);
            const mes = await axios.post(`${URL}/postlist`, {
                parentid: null,
                retweetid: postid,
                username: user,
                text: null,
                media1: null
            });
            console.log(mes.data.message);
            if(mes.data.message==="Spam"){window.alert("Possible spam detected. Please try again later."); }
        }
        else if (retweeted === true) {
            setRetweeted(false);
            setRetweets(retweets - 1);
            await axios.post(`${URL}/retweetlist/delete`, { username: user, retweetid: postid });
        }
    }

    useEffect( () =>{
        setButtons(
            <div className="post_footer">
            <button className={"Heart_"+liked} onClick={toggleLike}><Heart />{likes}</button>
            <button className="Replies" onClick={reply}><Chat />{replies}</button>
            <button className={"Retweet_"+retweeted} onClick={toggleRetweet}><Repeat />{retweets}</button>
            <button className={"Bookmark_"+bookmarked} onClick={toggleBookmark}><BookmarkSimple /></button>
        </div>
        );
    }, [liked, likes, bookmarked, retweets, retweeted]
    )

    const reply = async () => {
        navigate('/Reply/' + postid);
    }

    const gotoParent = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/Reply/' + parentId);
    }

    const gotoUser = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/User/' + username);
    }
    
    const gotoRetweeter = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/User/' + retweeter);
    }
    
    /*
        const poster = await axios.get('${URL}/userlist', {
            username: post.data.username
        });
    */
    //avatar = poster.displaypic;
    //displayname = poster.data.displayname;

    useEffect(  () =>  {
        if(parentUser == "" || parentUser === null) {
            setReplyingTo([]);
        }
        else{
            setReplyingTo(
                <div>
                <span className="post_replyingTo">
                    <button className="GotoParent" onClick={gotoParent}><ArrowBendUpRight/></button>
                    Replying to @{parentUser}
                </span>
                </div>
            );
        }
    }, [parentUser]);

    if(retweetId === null || retweetId ===0)
    {
    return (
        <div className="post">
            <div className="post_body">
                <div>{retweetHeader}</div>
                <div className="clickable_area" onClick={reply}>
                    <span className="post_header">
                        <div className="post_headerText">
                            <h3>
                                {avatar}
                                <span className="post_displayname" onClick={gotoUser}>{displayname}{" "}</span>
                                <span className="post_username" onClick={gotoUser}> @{username} {" · "}</span>
                                <span className="post_time" > {timeGap} </span>
                                {replyingTo}
                            </h3>
                        </div>
                        <div className="post_headerDescription">
                            <p>{text}</p>
                        </div>
                        <img src={image} alt="" className="postImage" />
                    </span>
                </div>
                {buttons}
            </div>
        </div>
    );}

    else{
        return(
            <div>
            <div className="retweet_headerText"> <h3>
            {avatar}
            <span className="post_displayname" onClick={gotoUser}>{displayname}{" "}</span>
            <span className="post_username" onClick={gotoUser}> @{username} </span>
            <div  className="retweeted"> retweeted <Repeat/></div>
        </h3></div>
        <Post postid={retweetId} user={user} key={retweetId} />
        </div>
        );

    }
}


export default Post;