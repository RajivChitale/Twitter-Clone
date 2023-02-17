import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URL from './globalvars.js';
const Auth = () => {
    const [username, setUser] = useState("");
    const navigate = useNavigate();
    const returnuser = async () => {
        let usertoken = document.cookie;
        usertoken = usertoken.split('=:')[1];
        console.log(usertoken);
        try {
            const user = await axios.post(`${URL}/checkToken`, {
                token: usertoken
            });
            if (user.data.success) {
                //console.log(user.data.username);
                setUser(user.data.username);
            }
            else {
                navigate("/");
            }
        } catch (error) {
            navigate("/");
        }
        return username;
    }
    useEffect(() => {
        returnuser();
    }, []);
}

export default Auth;