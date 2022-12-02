import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sign.css';
import WarblerLogo from "../graphics/logo.png";
const Signin = () => {
    const [entryUsername, setEntryUsername] = useState('');
    const [entryPassword, setEntryPassword] = useState('');
    const navigate = useNavigate();

    //Realised checking should be server side. 
    const checkPassword = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://192.168.51.81:5000/userlist/auth', {
            username: entryUsername,
            password: entryPassword
        });
        if (res.data.outcome === "Success") {
            document.cookie = `token=:${res.data.token}`;
            navigate("/Home");
        }
        else { window.alert("Incorrect username or password") } //;  "Incorrect username or password"
    }

    return (
        <div className='Page'>
            <div className='Warbler_Text'>Warbler</div>
            <div className='Image'>
                <img src={WarblerLogo} className='Warbler_Icon' alt='WarblerLogo' />
            </div>
            <div className='SignIn'>

                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter your Username"
                            value={entryUsername}
                            onChange={(e) => setEntryUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="inputPassword">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Enter your Password"
                            value={entryPassword}
                            onChange={(e) => setEntryPassword(e.target.value)}
                        />

                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers, and
                            must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={checkPassword}>
                        Submit
                    </Button>
                </Form>
                <Link to="/Signup">To register </Link>

            </div>
        </div>
    )
}

export default Signin;