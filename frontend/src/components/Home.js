import Feed from './Feed.js';
import Navbar from './Navbar.js';
import './2col.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const curr ='';
    const [username, setUser] = useState("");
    const navigate = useNavigate();
    const Auth = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        console.log(usertoken);
        try {
            const user = await axios.post('http://192.168.51.81:5000/checkToken', {
                token: usertoken
            });
            if (user.data.success) {
                //console.log(user.data.username);
                await setUser(user.data.username);
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
    }, []);
    return (
        <div className='Home'>
            <Navbar active="/Home" />
            <Feed  username = {username}/>
        </div>
    );
}

export default Home;