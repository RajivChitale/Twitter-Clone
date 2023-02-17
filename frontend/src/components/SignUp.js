import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sign.css';
import WarblerLogo from "../graphics/logo.png";
import URL from './globalvars.js';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const saveUser = async (e) => {
        e.preventDefault();

        if(username.length < 3) {setErrorMessage("Username is too short! It must have at least 3 characters.");}
        else if(username.length > 20) {setErrorMessage("Username is too long! It must have most 20 characters.");}
        else if(!username.match(/^[a-zA-Z0-9_]+$/)) {setErrorMessage("Username can only contain letters, numbers and underscores! (no spaces, special characters and emojis)");}
        else if(password.length < 8) {setErrorMessage("Password is too short! It must have at least 8 characters.");}
        else if(password.length > 20) {setErrorMessage("Password is too long! It must have at most 20 characters.");}
        else if(!password.match(/^[!-~]+$/)) {setErrorMessage("Password can only contain letters, numbers, symbols and underscores! (no spaces, emojis or other special characters)");}
        else{
            let res = await axios.post(`${URL}/userlist`, {
                username: username,
                password: password,
                displayname: username,
                displaypic: null,
                bio: 'Hello I am using Warbler',
                location: null,
                birthday: null,
                jointime: null,
                followercount: 0,
                followingcount: 0
            });
            if (res.data.success == true) {
                document.cookie = `token=:${res.data.token}`;
                navigate("/Home");
            }
            else { setErrorMessage("This username has already been taken!") }
        }  
    }
    return (
        <div className='Page'>
            <div className='Warbler_Text'>Warbler</div>
            <div className='Image'>
                <img src={WarblerLogo} className='Warbler_Icon' alt='WarblerLogo' />
            </div>
            <div className='SignUp'>

                <Form >
                    <Form.Group className="mb-2" >
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Create your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label >Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Create your Password"
                            aria-describedby="passwordHelpBlock"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Username can contain numbers, letters and underscores. Password can also contain symbols. Spaces and emojis are not allowed.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={saveUser} >
                        Submit
                    </Button>
                </Form>
                <Link to="/" className="LinkText">Already have an account?</Link>
                <div className="ErrorMessage">{errorMessage}</div>
            </div>
        </div>
    )
}

export default SignUp;