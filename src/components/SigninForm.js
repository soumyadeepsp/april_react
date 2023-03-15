import { useState, useContext, withRouter } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';
import AuthContext from '../context/authContext/authContext';
import { useNavigate } from "react-router-dom";

function SigninForm() {
    const {user, setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();
    const signin = async (e) => {
        var res = await axios.post('http://localhost:8000/users/create_session', {
            email: email,
            password: password,
            withCredentials: true
        });
        console.log(res);
        if (res.data.success===false) {
            alert("Login failed");
        }
        if (res.data.success===true) {
            setUser(res.data.user);
            console.log(res.data.user);
            navigate('/users/profile');
            // window.location = `http://localhost:3006/users/profile`;
        }
    }
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <input id='email' onChange={changeEmail} type='email' name='email' placeholder='Your email'></input>
            <input id='password' onChange={changePassword} type='password' name='password' placeholder='Your password'></input>
            <button onClick={signin}>Sign In</button>
        </form>
    );
}

export default SigninForm;