import Navbar from './Navbar.js';
import './2col.css';
import Post from './Post.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Pen } from 'phosphor-react';
import Form from 'react-bootstrap/Form';
const Profile = () => {
    const [username, setUser] = useState("");
    const navigate = useNavigate();
    const [displayname, setdisplayname] = useState('');
    const [bio, setbio] = useState('');
    const [location, setlocation] = useState('');
    const [birthday, setbirthday] = useState('');
    const Auth = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        console.log(usertoken);
        try {
            const user = await axios.post('http://192.168.51.81:5000/checkToken', {
                token: usertoken
            });
            if (user.data.success) {
                setUser(user.data.username);
            }
            else {
                navigate("/");
            }
        } catch (error) {
            navigate("/");
        }

        const UserDetails = async () => {
            const user = await axios.get(`http://192.168.51.81:5000/userlist/${post.data.username}`);
            setdisplayname(user.data.displayname);
            setbio(user.data.bio);
            setlocation(user.data.location);
            setbirthday(user.data.birthday);
        }

    }
    useEffect(() => {
        Auth();
    }, []);

    const update = async () => {
        const res = await axios.patch(`http://192.168.51.81:5000/userlist`, {
            displayname: displayname,
            bio: bio,
            location: location,
            birthday: birthday
        });
    }

    const [post, setPost] = useState([]);
    const postsBySender = async () => {
        const objlist = await axios.get(`http://192.168.51.81:5000/postlist/sender/${username}`);
        const postlist = await objlist.data.map((obj) => <Post postid={obj.postid} key={obj.postid} user={username} />);
        setPost(postlist);
    }

    useEffect(() => {
        postsBySender();
    }, []);
    return (
        <div className='Profile'>
            <Navbar active="/Profile" />
            <div className='User'>
                <div className='User_Header'>
                    {username}
                </div>
                <div className='User_Details'>

                    <Form>
                        <div className='User_displayname'>
                            <Form.Group className="mb-2">
                                <Form.Label>Display_Name</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Display Name"
                                    value={displayname}
                                    onChange={(e) => setdisplayname(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_bio'>
                            <Form.Group className="mb-2">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Bio"
                                    value={bio}
                                    onChange={(e) => setbio(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_birthday'>
                            <Form.Group className="mb-2">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Birthday"
                                    value={birthday}
                                    onChange={(e) => setbirthday(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className='User_location'>
                            <Form.Group className="mb-2">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter your Location"
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <button className='Submit_Info' onClick={update}><Pen /></button>
                    </Form>


                </div>
                <div className='User_Posts'>
                    <div className='User_Posts_Header'>
                        <button className="User_Posts_Button" onClick={postsBySender}>Show User Posts</button>
                        {post}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;