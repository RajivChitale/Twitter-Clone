import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sign.css';
import WarblerLogo from "../graphics/logo.png";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const saveUser = async (e) => {
        e.preventDefault();
        let res = await axios.post('http://192.168.51.81:5000/userlist', {
            username: username,
            password: password,
            displayname: username,
            displaypic: null,
            bio: 'Hello I am using Warbler',
            location: null,
            birthday: null,
            jointime: null
        });
        if (res.data.success == true) {
            document.cookie = `token=:${res.data.token}`;
            navigate("/Home");
        }
        else { window.alert("Someone has already taken this username.") }
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
                            placeholder="Enter your Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label >Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your Password"
                            aria-describedby="passwordHelpBlock"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={saveUser} >
                        Submit
                    </Button>
                </Form>
                <Link to="/">To log in</Link>
            </div>
        </div>
    )
}

export default SignUp;