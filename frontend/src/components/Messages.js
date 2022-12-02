import Navbar from './Navbar.js';
import './2col.css';
import { useState, useEffect, useNavigate } from 'react';
import axios from 'axios';

function Messages_box(user) {
  return (
    <div className='Messages_box'>Messages</div>
  );
}
const Messages = () => {
  const [username, setUser] = useState("");
  const navigate = useNavigate();
  const Auth = async () => {
    let usertoken = document.cookie;
    usertoken = usertoken.split('=:')[1];
    console.log(usertoken);
    const user = await axios.post('http://192.168.51.81:5000/checkToken', {
      token: usertoken
    });
    if (user.data.success) {
      setUser(user.data.username);
    }
    else {
      navigate("/");
    }
  }
  useEffect(() => {
    Auth();
  }, []);
  return (
    <div className='Messages'>
      <Navbar active="/Messages" />
      <Messages_box user={username} />
    </div>
  );
}

export default Messages;
