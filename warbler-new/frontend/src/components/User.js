import Navbar from './Navbar.js';
import './2col.css';
import Post from './Post.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Pen } from 'phosphor-react';
import Form from 'react-bootstrap/Form';
import URL from './globalvars.js';

const User = () => {
    const username = useLocation().pathname.split('/')[2];
    const navigate = useNavigate();
    const [displayname, setdisplayname] = useState('');
    const [bio, setbio] = useState('');
    const [location, setlocation] = useState('');
    const [birthday, setbirthday] = useState('');
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [avatar, setAvatar] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [followButton, setFollowButton] = useState("");
    const [isFollowed, setIsFollowed] = useState(false);

    const Auth = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        console.log(usertoken);
        try {
            const user = await axios.post(`${URL}/checkToken`, {
                token: usertoken
            });
            if (user.data.success) {
                setCurrentUser(user.data.username);
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
    },[]);

    const UserDetails = async () => {
        const user = await axios.get(`${URL}/userlist/${username}`);
        setdisplayname(user.data.displayname);
        setbio(user.data.bio);
        if(user.data.location!=="" && user.data.location!==null)
            {setlocation("Located at "+user.data.location); }
        setbirthday(user.data.birthday);
        setFollowingCount(user.data.followingcount);
        setFollowerCount(user.data.followercount);

        if(user.data.displaypic === null || user.data.displaypic === '')
            {setAvatar(<img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" className="post_avatar" alt="profile pic" />); }
        else
            {setAvatar(<img src={user.data.displaypic} className="post_avatar" alt="profile picture" />); }

        const objlist3 = await axios.get(`${URL}/followlist/follower/${currentUser}`);
        console.log(objlist3);
        if(username === currentUser) {return;}
        else if (objlist3.data.some( obj => obj.following === username )) {
            setIsFollowed(true); 
            console.log("already"); 
            setFollowButton(<button  onClick={toggleFollow} className="Unfollow_Button">Unfollow</button>);
        }
        else{setIsFollowed(false);   setFollowButton(<button  onClick={toggleFollow} className="Follow_Button">Follow</button>);}
    }
    useEffect(() => {
    if(currentUser !== "" && currentUser !== null)
        {UserDetails();}
    },[currentUser, isFollowed, username]);

    const toggleFollow = async () => {
        if(username === currentUser) {return;}
        if (isFollowed === false) {
            setIsFollowed(true);
            setFollowButton(<button  onClick={toggleFollow} className="Unfollow_Button">Unfollow</button>);
            await axios.post(`${URL}/followlist`, { follower: currentUser, following: username });
        }
        else if (isFollowed === true) {
            setIsFollowed(false);
            setFollowButton(<button  onClick={toggleFollow} className="Follow_Button">Follow</button>);
            await axios.post(`${URL}/followlist/delete`, {follower: currentUser, following: username });
        }
    }

    const [post, setPost] = useState([]);
    const postsBySender = async () => {
        const objlist = await axios.get(`${URL}/postlist/sender/${username}`);
        const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
        setPost(postlist);
    }

    useEffect(() => {
        if(username!== "")
        {
            postsBySender();
        }
    }, [currentUser, username]);

    return (
        <div className='Profile'>
            <Navbar active="/Profile" />
            <div className='User'>
                <div className='User_Header'>
                    {avatar}
                    {displayname} @{username}
                </div>
                <div className="Follow_Details">
                    <span>{followingCount} following</span>
                    <span>{followerCount} followers</span> 
                    {followButton}
                </div>
                <div className='User_Details'>
                                <div>{bio}</div>
                                <div>{location}</div>
                </div>
                <div className='User_Posts'>
                    <div className='User_Posts_Header'>
                        {post}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default User;