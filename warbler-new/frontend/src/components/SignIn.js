import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Sign.css';
import WarblerLogo from "../graphics/logo.png";
import URL from './globalvars.js';


const Signin = () => {
    const [entryUsername, setEntryUsername] = useState('');
    const [entryPassword, setEntryPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    //Realised checking should be server side. 
    const checkPassword = async (e) => {

        e.preventDefault();
        const res = await axios.post(`${URL}/userlist/auth`, {
            username: entryUsername,
            password: entryPassword
        });
        if (res.data.outcome === "Success") {
            document.cookie = `token=:${res.data.token}`;
            navigate("/Home");
        }
        else { setErrorMessage("Incorrect username or password") } //;  "Incorrect username or password"
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

                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={checkPassword}>
                        Submit
                    </Button>
                </Form>
                <Link to="/Signup" className="LinkText">Don't have an account yet? </Link>
                <div className="ErrorMessage">{errorMessage}</div>
            </div>
        </div>
    )
}

export default Signin;