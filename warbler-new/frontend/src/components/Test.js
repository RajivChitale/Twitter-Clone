import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Test = async() => {
    let username = "";
    let navigate = useNavigate();
    let token = document.cookie;
    token = token.split('=:')[1];
    console.log(token);
    const user = await axios.get(`${URL}/checkToken`, {
        token: token
    });
    console.log(user);
    if (user.data.success === "true") {
        username = user.data.username;
        console.log(username);
        return username;
    }

}
export default Test;