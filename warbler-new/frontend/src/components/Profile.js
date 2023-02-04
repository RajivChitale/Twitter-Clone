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

const Profile = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [displayname, setDisplayname] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [displayPicture, setDisplayPicture] = useState('');
    const [avatar, setAvatar] = useState('');
    const [birthday, setBirthday] = useState('');
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const Auth = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        console.log(usertoken);
        try {
            const user = await axios.post(`${URL}/checkToken`, {
                token: usertoken
            });
            if (user.data.success) {
                setUsername(user.data.username);
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
        setDisplayname(user.data.displayname);
        setDisplayPicture(user.data.displaypic);
        setBio(user.data.bio);
        setLocation(user.data.location);
        setBirthday(user.data.birthday);
        setFollowingCount(user.data.followingcount);
        setFollowerCount(user.data.followercount);

        if(user.data.displaypic === null || user.data.displaypic === '')
            {setAvatar(<img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" className="post_avatar" alt="profile pic" />); }
         else
            {setAvatar(<img src={user.data.displaypic} className="post_avatar" alt="profile picture" />); }
    }
    useEffect(() => {
        UserDetails();
    },[username]);

    const update = async () => {
        console.log(username);
        await axios.patch(`${URL}/userlist`, {
            username : username,
            displayname: displayname,
            displaypic: displayPicture,
            bio: bio,
            location: location,
            birthday: birthday
        });
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
    }, [username]);
    return (
        <div className='Profile'>
            <Navbar active="/Profile" />
            <div className='User'>
                <div className='User_Header'>
                    {avatar}
                    {username}
                </div>
                <div className='User_Details'>

                    <Form>
                        <div className='User_displayname'>
                            <Form.Group className="mb-2">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Display Name"
                                    value={displayname}
                                    onChange={(e) => setDisplayname(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_bio'>
                            <Form.Group className="mb-2">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_birthday'>
                            <Form.Group className="mb-2">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Birthday"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_location'>
                            <Form.Group className="mb-2">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_displaypic'>
                            <Form.Group className="mb-2">
                                <Form.Label>Display picture</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter link to display picture"
                                    value={displayPicture}
                                    onChange={(e) => setDisplayPicture(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <button className='Submit_Info' onClick={update}><Pen /></button>
                    </Form>
                    <div>Followers: {followerCount}</div>
                    <div>Following: {followingCount}</div>
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

export default Profile;