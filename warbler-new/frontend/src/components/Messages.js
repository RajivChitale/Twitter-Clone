import Navbar from './Navbar.js';
import './2col.css';
import './TweetBox.css';
import URL from './globalvars.js';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Message from './Message.js';
import MessageBox from './MessageBox.js';


const Messages = () => {
  const location = (useLocation().pathname).split('/')[2];
  const [username, setUser] = useState("");
  const navigate = useNavigate();
  const [messagelist, setMessagelist] = useState([]);
  const Auth = async () => {
    let usertoken = document.cookie;
    usertoken = usertoken.split('=:')[1];
    try {
      const user = await axios.post(`${URL}/checkToken`, {
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
  }
  useEffect(() => {
    Auth();
  }, []);

const setup = async() =>{
  console.log(location);
  const idlist = await axios.post(`${URL}/messagelist/getchat`, {sender: username, receiver: location});
  const messages = await idlist.data.map((obj) => <Message messageid={obj} user={username} key={obj} />);
  console.log(idlist.data);
  setMessagelist(messages);
}

  useEffect(() => {
    if(username !== null && username !=='')
    {
        setup();
    }
  }, [username]);

  
  return (
    <div className='Messages'>
      <Navbar active="/Messages" />
      <div className='Exploring'>
        {location} 
        <div className='MessageInputBox'><MessageBox username={username} receiver={location}/></div>
        <div className='Body'>{messagelist}</div>
      </div>
    </div>
  );
}

export default Messages;
