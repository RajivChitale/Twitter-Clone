import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = async () => {
    let username = "";
    let navigate = useNavigate();
    let token = document.cookie;
    token = token.split('=:')[1];
    const user = await axios.post('http://192.168.51.81:5000/checkToken', {
        token: token
    });
    console.log(user);
    if (user.data.success === "true") {
        username = user.data.username;
        return username;
    }

}
export default Auth;